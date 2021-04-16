import React from "react";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import firebase from "firebase/app";
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

export default function historicalData(electricity, type, selectedDate, floor) {
  let histChartData = [];
  db.ref()
    .child(electricity)
    .child(type)
    .child(selectedDate)
    .child(floor)
    .child("graph")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        for (const element of snapshot.val()) {
          histChartData.push({ x: element.x, y: element.y });
        }

        const transformedData = map(
          groupBy(histChartData, (value) => new Date(value.x).getHours()),
          (items, xaxis) => {
            const dateTime = new Date(histChartData[0].x);
            return {
              x: dateTime.setHours(xaxis, 0, 0, 0),
              y: items.reduce(
                (acc, value) =>
                  Number(Math.round(acc + value.y + "e2") + "e-2"),
                0
              ),
            };
          }
        );

        ApexCharts.exec("load", "updateSeries", [{ data: transformedData }]);
      } else {
        console.log("No data found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function historicalAdminData(electricity, type, selectedDate) {
  db.ref()
    .child(electricity)
    .child(type)
    .child(selectedDate)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([key, floor]) => {
          return floor.graph.map((element) => {
            return { x: element.x, y: element.y };
          });
        });

        console.log(data);

        const transformedData = map(
          groupBy(data.flat(), (element) => new Date(element.x).getHours()),
          (items, xaxis) => {
            const dateTime = new Date(data[0][0].x);
            return {
              x: dateTime.setHours(xaxis, 0, 0, 0),
              y: items.reduce(
                (acc, value) =>
                  Number(Math.round(acc + value.y + "e2") + "e-2"),
                0
              ),
            };
          }
        );

        ApexCharts.exec("aggload", "updateSeries", [{ data: transformedData }]);
      } else {
        console.log("No data found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
