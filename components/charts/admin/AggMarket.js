import React, { useState } from "react";
import Chart from "react-apexcharts";

const AggMarket = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Avg Price(baht)",
        type: "line",
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
        id: "aggprice",
        height: 400,
        width: "100%",
        type: "line",
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
        text: "Aggregated Transfer Market Price",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
      },
      noData: { text: "Loading..." },
      colors: ["#e1bd50", "#243aa1"],
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
        type="line"
        height={400}
        width="100%"
        responsive={chart.responsive}
      />
    </div>
  );
};

export default AggMarket;
