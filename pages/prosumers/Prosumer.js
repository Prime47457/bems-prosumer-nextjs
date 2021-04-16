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

export default function Consumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    historicalData(
      "Electricity",
      "Load",
      date.toISOString().substring(0, 10),
      "Floor 1"
    );
  };

  return (
    <div className="grid-page">
      <Head>Prosumer Information</Head>
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
          <Electricity />
        </Paper>
      </div>
    </div>
  );
}
