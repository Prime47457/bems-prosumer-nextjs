import React, { useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import { historicalAdminData } from "../../assets/historicalData";

const AggElectricity = dynamic(
  () => {
    return import("../../components/charts/AggElectricity");
  },
  { ssr: false }
);

export default function AdminProsumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    historicalAdminData(
      "Electricity",
      "Load",
      date.toISOString().substring(0, 10)
    );
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
              value={selectedDate}
              onChange={handleDateChange}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
          <AggElectricity />
        </Paper>
      </div>
    </div>
  );
}
