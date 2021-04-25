import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.NEXT_APP_FIREBASE_REALTIMEDBURL,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_SENDER_ID,
  appId: "1:1083389397572:web:1470b861f0c2209e9b8a11",
  measurementId: "G-JQXCS7B1JK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

ReactFC.fcRoot(FusionCharts, PowerCharts, FusionTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "chord", // The chart type
  width: "700", // Width of the chart
  height: "700", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "P2P Electricity Market Trade",
      subcaption:
        "A No-Node Sankey where the entities are just represented by the labels.",
      theme: "fusion",
      numbersuffix: " Million",
      nodewidth: 0,
      nodelinkpadding: 3,
      linkcolor: "blend",
      linkcurvature: 0.6,
      linkalpha: 40,
      nodeSpacing: 15,
    },
    nodes: [
      {
        label: "Floor 1",
      },
      {
        label: "Floor 2",
      },
      {
        label: "Floor 3",
      },
      {
        label: "Floor 6",
      },
      {
        label: "Floor 7",
      },
    ],
    links: [
      {
        from: "Floor 1",
        to: "Floor 3",
        value: 3.23,
      },
      {
        from: "Floor 7",
        to: "Floor 3",
        value: 3.23,
      },
      {
        from: "Floor 1",
        to: "Floor 7",
        value: 3.23,
      },
      {
        from: "Floor 3",
        to: "Floor 1",
        value: 3.23,
      },
      {
        from: "Floor 3",
        to: "Floor 3",
        value: 2.89,
      },
      {
        from: "Floor 6",
        to: "Floor 2",
        value: 3.67,
      },
      {
        from: "Floor 2",
        to: "Floor 3",
        value: 3.11,
      },
      {
        from: "Floor 7",
        to: "Floor 6",
        value: 2.71,
      },
    ],
  },
};

export default function P2PChord() {
  const [chart, sertChart] = useState(chartConfigs);
  useEffect(() => {
    db.ref("Market/admin")
      .child(date)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          firebase.firestore();
        }
      });
  }, []);
  return <ReactFC {...chart} />;
}
