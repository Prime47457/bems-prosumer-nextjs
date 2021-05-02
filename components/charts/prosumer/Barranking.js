import React, { useState } from "react";
import Chart from "react-apexcharts";

const Barranking = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Price of this round (baht)",
        data: [3, 4],
      },
    ],
    options: {
      chart: {
        id: "barranking",
        height: 400,
        width: "100%",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: "Price comparison (Latest Round)",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
      },
      noData: { text: "Loading..." },
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 4.12) {
            return "#ba0e02";
          } else {
            return "#e1bd50";
          }
        },
      ],
      xaxis: {
        categories: ["Buying Price", "Selling Price"],
      },
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
