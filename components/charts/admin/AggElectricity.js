import React, { useState } from "react";
import Chart from "react-apexcharts";

const AggElectricity = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Load",
        data: [],
      },
    ],
    options: {
      chart: {
        id: "aggload",
        height: 250,
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
        text: "Aggregated Electricity Load",
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
        responsive={chart.responsive}
      />
    </div>
  );
};

export default AggElectricity;
