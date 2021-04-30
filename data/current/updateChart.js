import axios from "axios";
import groupBy from "lodash/groupBy";
import map from "lodash/map";

export default function updateChart(url, floor) {
  let chartData = [];
  const load = axios
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
      const sumData = transformedData.reduce((acc, cur) => {
        return acc + cur.y;
      }, 0);
      ApexCharts.exec("load", "updateSeries", [{ data: transformedData }]);
      ApexCharts.exec("load", "updateOptions", {
        title: {
          text: "Electricity Load of " + floor,
        },
      });
      return { total: sumData };
    })
    .catch((err) => {
      console.log(err);
    });
  return load;
}

export async function updateAdminChart(urlArray) {
  const data = [];
  for (const url of urlArray) {
    const res = await axios.get(url);
    data.push(
      res.data.graph.map((element) => {
        return { x: element.x, y: element.y };
      })
    );
  }

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

export async function updateAdminDonutChart(urlArray) {
  const data = [];
  const label = [];
  for (const url of urlArray) {
    const res = await axios.get(url);
    const sum = res.data.graph.reduce((acc, cur) => {
      return acc + cur.y;
    }, 0);
    data.push(Number(Math.round(sum + "e2") + "e-2"));
    label.push(res.data.name);
  }

  ApexCharts.exec("aggdonut", "updateOptions", {
    series: data,
    labels: label,
  });
}
