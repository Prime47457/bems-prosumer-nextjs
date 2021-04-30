import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

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
  width: "100%", // Width of the chart
  height: "500", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    // chart: {
    //   caption: "P2P Electricity Market Trade",
    //   subcaption: "Latest hour",
    //   theme: "fusion",
    //   numbersuffix: " baht",
    //   nodewidth: 0,
    //   nodelinkpadding: 3,
    //   linkcolor: "blend",
    //   linkcurvature: 0.6,
    //   linkalpha: 40,
    //   nodeSpacing: 15,
    // },
    // nodes: [],
    // links: [],
  },
};

export default function P2PChord() {
  const [chart, sertChart] = useState(chartConfigs);
  useEffect(() => {
    const date = new Date()
      .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
      .substring(0, 10);
    // dont forget to change
    const dateHour = new Date().setHours(13, 0, 0, 0);
    db.ref("Market/admin")
      .child(date)
      .child(dateHour)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const links = [];
          const nodes = [];
          firebase
            .firestore()
            .collection("users")
            .get()
            .then((res) => {
              nodes.push(
                { label: "cu" },
                { label: "cu_secondary" },
                { label: "cu_primary" }
              );
              const keys = res.docs.map((doc) => {
                nodes.push({ label: "Floor " + doc.data().floor });
                return { uid: doc.id, floor: "Floor " + doc.data().floor };
              });
              for (const result of snapshot.val().results) {
                const from =
                  result.sellerId.length > 12
                    ? keys.filter((key) => {
                        return key.uid === result.sellerId;
                      })[0].floor
                    : result.sellerId;
                const to =
                  result.buyerId.length > 12
                    ? keys.filter((key) => {
                        return key.uid === result.buyerId;
                      })[0].floor
                    : result.buyerId;

                const value = Number(Math.round(result.price + "e2") + "e-2");

                links.push({ from, to, value });
              }

              sertChart({
                dataSource: {
                  chart: {
                    caption: "P2P Electricity Market Trade",
                    subcaption:
                      "The movement of eletricity from seller to buyer with transaction price of the latest round",
                    theme: "fusion",
                    palettecolors:
                      "#404a70, #e1bd50, #243aa1, #fc7303, #03ab7b, #ba0e02, #7a2f8f, ",
                    numbersuffix: " baht",
                    nodewidth: 0,
                    showlegend: 0,
                    nodelinkpadding: 3,
                    linkcolor: "blend",
                    linkcurvature: 0.2,
                    linkalpha: 40,
                    nodeSpacing: 15,
                  },
                  nodes: nodes,
                  links: links,
                },
              });
            });
        } else {
          console.log("No data found");
        }
      });
  });
  return <ReactFC {...chart} />;
}
