// import React from "react";
// // import { Bar } from "react-chartjs-2";
// import Chart from "react-apexcharts";

// const AggLoadForecast = () => {
//   const data = {
//     options: {
//       chart: {
//         id: "basic-bar",
//       },
//       xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
//       },
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [30, 40, 45, 50, 49, 60, 70, 91],
//       },
//     ],
//   };
//   return (
//     <div>
//       <Chart type="bar" series={data} height={400} width={600} />
//     </div>
//   );
// };

// export default AggLoadForecast;

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import data from "../../public/bldCharacteristicData";
// import * as d3 from "d3";

const AggLoadForecast = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Watts",
        type: "column",
        data: [234, 234, 234, 434, 243, 346, 487, 276, 260, 350, 198, 325],
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    options: {
      chart: {
        height: 400,
        width: "100%",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "Aggregated Electricity Load",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      colors: ["#243aa1"],
      labels: [
        "01 Jan 2021",
        "02 Jan 2021",
        "03 Jan 2021",
        "04 Jan 2021",
        "05 Jan 2021",
        "06 Jan 2021",
        "07 Jan 2021",
        "08 Jan 2021",
        "09 Jan 2021",
        "10 Jan 2021",
        "11 Jan 2021",
        "12 Jan 2021",
      ],
      xaxis: {
        type: "datetime",
      },
      yaxis: [
        {
          title: {
            text: "Website Blog",
          },
        },
      ],
    },
  });
  // useEffect(() => {
  //   d3.csv(bldCharacteristicData).then((data) => {
  //     console.log(data);
  //   });
  // }, []);
  // useEffect(() => {
  //   chart.series({
  //     data,
  //   });
  // });
  return (
    <div id="chart">
      <Chart
        options={chart.options}
        series={chart.series}
        type="bar"
        height={400}
        width="100%"
        responsive={chart.responsive}
      />
    </div>
  );
};

export default AggLoadForecast;
