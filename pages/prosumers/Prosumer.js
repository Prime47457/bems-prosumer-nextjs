import React, { useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import historicalData from "../../assets/historicalData";
import updateChart from "../../assets/updateChart";

const Electricity = dynamic(
  () => {
    return import("../../components/charts/Electricity");
  },
  { ssr: false }
);

const Market = dynamic(
  () => {
    return import("../../components/charts/Market");
  },
  { ssr: false }
);

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

export default function Prosumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriceDate, setSelectedPriceDate] = useState(new Date());

  const user = firebase.auth().currentUser;
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    historicalData(
      "Electricity",
      "Load",
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10),
      "Floor 1"
    );
  };

  const handleDatePriceChange = (date) => {
    setSelectedPriceDate(date);
  };

  return (
    <div className="grid-page">
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <Navbar />
      <div className="chart-container">
        <Paper>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="load-chart"
              value={selectedDate}
              onChange={handleDateChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <Electricity date={selectedDate} />
        </Paper>
        <Paper>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="price-chart"
              value={selectedPriceDate}
              onChange={handleDatePriceChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <Market />
        </Paper>
      </div>
    </div>
  );
}
