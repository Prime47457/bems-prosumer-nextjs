import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarrankingQuan = () => {
  const [chart, setChart] = useState({
    series: [
      {
        name: "Quantity of this round (kW)",
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
        id: "barrankingquan",
        height: 400,
        width: "100%",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: "Quantity comaprison (Latest Round)",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
      },
      noData: { text: "Loading..." },
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 4) {
            return "#ba0e02";
          } else {
            return "#243aa1";
          }
        },
      ],
      xaxis: {
        categories: ["Quantity bought", "Quantity Sold"],
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

export default BarrankingQuan;
