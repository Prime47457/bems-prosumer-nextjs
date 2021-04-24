import React, { useState } from "react";
import Chart from "react-apexcharts";

const AggDonut = () => {
  const [chart, setChart] = useState({
    series: [],
    options: {
      labels: [],
      chart: {
        id: "aggdonut",
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return Number(Math.round(val + "e2") + "e-2") + "%";
        },
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: "Daily total Load of each floor",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <Chart
        options={chart.options}
        series={chart.series}
        type="donut"
        width={380}
      />
    </div>
  );
};

export default AggDonut;
