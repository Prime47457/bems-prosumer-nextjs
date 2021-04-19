import React, { useState } from "react";
import Chart from "react-apexcharts";

const Electricity = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Load",
        data: [],
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    options: {
      chart: {
        id: "load",
        height: 200,
        width: "100%",
        type: "column",
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true,
          },
        },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
          },
        },
      },
      title: {
        text: "Electricity Load",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      noData: { text: "Loading..." },
      colors: ["#243aa1"],
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "Power(kW)",
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
        type="bar"
        height={300}
        width="100%"
        responsive={chart.responsive}
      />
    </div>
  );
};

export default Electricity;
