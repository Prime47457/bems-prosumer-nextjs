import React, { useState } from "react";
import Chart from "react-apexcharts";

const AggQuantity = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Total Quantity Exchanged(kW)",
        type: "column",
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
        id: "aggquantity",
        height: 400,
        width: "100%",
        type: "bar",
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
        text: "Aggregated Transfer Market Quantity",
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [0],
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
      // yaxis: [
      //   {
      //     title: {
      //       text: "Price(Baht)",
      //     },
      //   },
      // ],
    },
  });

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

export default AggQuantity;
