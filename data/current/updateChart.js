import axios from "axios";
import groupBy from "lodash/groupBy";
import map from "lodash/map";

export default function updateChart(url) {
  let chartData = [];
  axios
    .get(url)
    .then((res) => {
      for (const element of res.data.graph) {
        chartData.push({ x: element.x, y: element.y });
      }

      const transformedData = map(
        groupBy(chartData, (value) => new Date(value.x).getHours()),
        (items, xaxis) => {
          const dateTime = new Date(chartData[0].x);
          return {
            x: dateTime.setHours(xaxis, 0, 0, 0),
            y: items.reduce(
              (acc, value) => Number(Math.round(acc + value.y + "e2") + "e-2"),
              0
            ),
          };
        }
      );
      ApexCharts.exec("load", "updateSeries", [{ data: transformedData }]);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateAdminChart(urlArray) {
  const data = await Promise.all(
    urlArray.map(async (url) => {
      const res = await axios.get(url);
      return res.data.graph.map((element) => {
        return { x: element.x, y: element.y };
      });
    })
  );
  const transformedData = map(
    groupBy(data.flat(), (value) => new Date(value.x).getHours()),
    (items, xaxis) => {
      const dateTime = new Date();
      return {
        x: dateTime.setHours(xaxis, 0, 0, 0),
        y: items.reduce(
          (acc, value) => Number(Math.round(acc + value.y + "e2") + "e-2"),
          0
        ),
      };
    }
  );

  ApexCharts.exec("aggload", "updateSeries", [{ data: transformedData }]);
}
