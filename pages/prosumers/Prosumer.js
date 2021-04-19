import React, { useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import historicalData from "../../assets/historicalData";

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

export default function Prosumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriceDate, setSelectedPriceDate] = useState(new Date());

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
