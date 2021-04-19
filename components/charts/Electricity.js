import React, { useState } from "react";
import Chart from "react-apexcharts";
import updateChart from "../../assets/updateChart";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_SENDER_ID,
  appId: "1:1083389397572:web:1470b861f0c2209e9b8a11",
  measurementId: "G-JQXCS7B1JK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Electricity = () => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const url = doc.data().link;
        updateChart(url);
        console.log("damn");
      });
  }
  const [chart, setChart] = useState({
    series: [],
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
