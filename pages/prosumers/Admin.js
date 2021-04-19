import React, { useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import { historicalAdminData } from "../../assets/historicalData";
import historicalAdminPriceData from "../../assets/historicalPrice";

const AggElectricity = dynamic(
  () => {
    return import("../../components/charts/AggElectricity");
  },
  { ssr: false }
);

const AggMarket = dynamic(
  () => {
    return import("../../components/charts/AggMarket");
  },
  { ssr: false }
);

export default function AdminProsumer() {
  const [selectedLoadDate, setSelectedLoadDate] = useState(new Date());
  const [selectedPriceDate, setSelectedPriceDate] = useState(new Date());

  const handleDateLoadChange = (date) => {
    setSelectedLoadDate(date);
    historicalAdminData(
      "Electricity",
      "Load",
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10)
    );
  };

  const handleDatePriceChange = (date) => {
    setSelectedPriceDate(date);
    const status = historicalAdminPriceData(
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10)
    );
    if (status === "No data found") {
      setSelectedPriceDate(new Date());
    }
  };

  return (
    <div className="grid-page">
      <Head>Total Prosumer Information</Head>
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
              value={selectedLoadDate}
              onChange={handleDateLoadChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <AggElectricity />
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
          <AggMarket />
        </Paper>
      </div>
    </div>
  );
}
