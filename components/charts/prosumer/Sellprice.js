import React, { useState } from "react";
import Chart from "react-apexcharts";

const Sellprice = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Average price sold(baht)",
        type: "area",
        data: [],
      },
      {
        name: "Quantity sold(kW)",
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
        id: "sellprice",
        height: 400,
        width: "100%",
        type: "area",
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
        text: "Transfer Market Selling Price",
      },
      dataLabels: {
        enabled: false,
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
    },
  });

  return (
    <div id="chart">
      <Chart
        options={chart.options}
        series={chart.series}
        type="area"
        height={250}
        width="100%"
        responsive={chart.responsive}
      />
    </div>
  );
};

export default Sellprice;
