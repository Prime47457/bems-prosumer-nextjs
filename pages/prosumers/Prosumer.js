import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import historicalData from "../../data/historical/historicalData";
import historicalPrice from "../../data/historical/historicalPrice";
import updateChart from "../../data/current/updateChart";
import updateBuyPriceQuan, {
  updateSellPriceQuan,
} from "../../data/current/updatePriceQuan";
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

const Electricity = dynamic(
  () => {
    return import("../../components/charts/prosumer/Electricity");
  },
  { ssr: false }
);

const Buyprice = dynamic(
  () => {
    return import("../../components/charts/prosumer/Buyprice");
  },
  { ssr: false }
);

const Sellprice = dynamic(
  () => {
    return import("../../components/charts/prosumer/Sellprice");
  },
  { ssr: false }
);

export default function Prosumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBuyDate, setSelectedBuyDate] = useState(new Date());
  const [selectedSellDate, setSelectedSellDate] = useState(new Date());

  const user = firebase.auth().currentUser;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        historicalData(
          "Electricity",
          "Load",
          date
            .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
            .substring(0, 10),
          "Floor " + doc.data().floor
        );
      });
  };

  const handleDateBuyChange = (date) => {
    setSelectedBuyDate(date);
    historicalPrice(
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10),
      user.uid,
      "bought"
    );
  };

  const handleDateSellChange = (date) => {
    setSelectedSellDate(date);
    historicalPrice(
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10),
      user.uid,
      "sold"
    );
  };

  useEffect(() => {
    if (
      user !== null &&
      selectedDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const url = doc.data().link;
          const floor = "Floor " + doc.data().floor;
          updateChart(url, floor);
        });
      if (
        selectedDate.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedDate(new Date());
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (
      user !== null &&
      selectedBuyDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateBuyPriceQuan(user.uid);
      if (
        selectedBuyDate.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedBuyDate(new Date());
      }
    }
  }, [selectedBuyDate]);

  useEffect(() => {
    if (
      user !== null &&
      selectedSellDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateSellPriceQuan(user.uid);
      if (
        selectedSellDate.setHours(0, 0, 0, 0) !==
        new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedSellDate(new Date());
      }
    }
  }, [selectedSellDate]);

  return (
    <div className="grid-page">
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <Navbar />
      <div className="chart-container">
        <Paper elevation={3}>
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
        <Paper elevation={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="price-chart"
              value={selectedBuyDate}
              onChange={handleDateBuyChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <Buyprice />
        </Paper>
        <Paper elevation={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="price-chart"
              value={selectedSellDate}
              onChange={handleDateSellChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <Sellprice />
        </Paper>
      </div>
    </div>
  );
}
