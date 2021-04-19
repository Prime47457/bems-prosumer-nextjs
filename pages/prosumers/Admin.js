import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import { historicalAdminData } from "../../data/historical/historicalData";
import { historicalAdminPrice } from "../../data/historical/historicalPrice";
import { updateAdminChart } from "../../data/current/updateChart";
import { updateAggPrice } from "../../data/current/updatePrice";

const AggElectricity = dynamic(
  () => {
    return import("../../components/charts/admin/AggElectricity");
  },
  { ssr: false }
);

const AggMarket = dynamic(
  () => {
    return import("../../components/charts/admin/AggMarket");
  },
  { ssr: false }
);

export default function AdminProsumer() {
  const [selectedLoadDate, setSelectedLoadDate] = useState(new Date());
  const [selectedPriceDate, setSelectedPriceDate] = useState(new Date());

  const urlArray = [
    "https://www.bems.chula.ac.th/web/cham5-api/api/v1/building/3/building_usage/day/peak",
    "https://www.bems.chula.ac.th/web/cham5-api/api/v1/building/4/building_usage/day/peak",
    "https://www.bems.chula.ac.th/web/cham5-api/api/v1/building/5/building_usage/day/peak",
    "https://www.bems.chula.ac.th/web/cham5-api/api/v1/building/8/building_usage/day/peak",
    "https://www.bems.chula.ac.th/web/cham5-api/api/v1/building/9/building_usage/day/peak",
  ];

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
    const status = historicalAdminPrice(
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10)
    );
    if (status === "No data found") {
      setSelectedPriceDate(new Date());
    }
  };

  useEffect(() => {
    if (
      selectedLoadDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateAdminChart(urlArray);
    }
  }, [selectedLoadDate]);

  useEffect(() => {
    updateAggPrice();
  });

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
