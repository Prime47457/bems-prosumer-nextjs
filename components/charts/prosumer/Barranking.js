import React, { useState } from "react";
import Chart from "react-apexcharts";

const Barranking = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Avg price bought(baht)",
        data: [],
      },
      {
        name: "Avg price sold(kW)",
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
        id: "barranking",
        height: 400,
        width: "100%",
        type: "bar",
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
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
      },
      title: {
        text: "Price Ranking of every round",
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
      yaxis: [
        {
          title: {
            text: "Price(Baht)",
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
        height={250}
        width="100%"
        responsive={chart.responsive}
      />
    </div>
  );
};

export default Barranking;
