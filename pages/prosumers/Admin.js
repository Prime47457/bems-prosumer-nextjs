import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import { historicalAdminData } from "../../data/historical/historicalData";
import { historicalAdminPriceQuan } from "../../data/historical/historicalPrice";
import {
  updateAdminChart,
  updateAdminDonutChart,
} from "../../data/current/updateChart";
import { updateAggPriceQuan } from "../../data/current/updatePriceQuan";

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

const AggQuantity = dynamic(
  () => {
    return import("../../components/charts/admin/AggQuantity");
  },
  { ssr: false }
);

const AggDonut = dynamic(
  () => {
    return import("../../components/charts/admin/AggDonut");
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
    const status = historicalAdminPriceQuan(
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
      if (
        selectedLoadDate.setHours(0, 0, 0, 0) !==
        new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedLoadDate(new Date());
      }
    }
  }, [selectedLoadDate]);

  useEffect(() => {
    if (
      selectedPriceDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateAggPriceQuan();
      if (
        selectedPriceDate.setHours(0, 0, 0, 0) !==
        new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedPriceDate(new Date());
      }
    }
  }, [selectedPriceDate]);

  useEffect(() => {
    updateAdminDonutChart(urlArray);
  }, []);

  return (
    <div className="grid-page">
      <Head>Total Prosumer Information</Head>
      <Navbar />
      <Grid container spacing={3} className="total-prosumer">
        <Grid item xs={6} className="total-prosumer-body">
          <div className="producer-information-left">
            <h2 className="information">Total Information</h2>
            <Grid item>
              <div className="time-interval">
                <div className="time-information">
                  <h5 className="time-left">Time</h5>
                  <hr className="border-color" />
                  <p className="time-left">11:30</p>
                </div>

                <div className="interval-information">
                  <h5 className="interval-right">Interval</h5>
                  <hr className="border-color" />
                  <p className="interval-right">1 Hour</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className="sale-information">
                <div className="sale">
                  <p>Total Load</p>
                  <h4>100</h4>
                </div>

                <hr className="border-color" />

                <div className="sale">
                  <p>Sale Count</p>
                  <h4>8</h4>
                </div>

                <hr className="border-color" />

                <div className="sale">
                  <p>Sale Amount</p>
                  <h4>1.5 MW</h4>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className="sale-information">
                <div className="sale">
                  <p>Purchase Load</p>
                  <h4>100</h4>
                </div>

                <hr className="border-color" />

                <div className="sale">
                  <p>Number of Producer</p>
                  <h4>8</h4>
                </div>

                <hr className="border-color" />

                <div className="sale">
                  <p>Number of Customer</p>
                  <h4>1.5 MW</h4>
                </div>
              </div>
            </Grid>
            <div
              style={{
                marginTop: "40px",
              }}
            />
            <Paper>
              <AggDonut />
            </Paper>
          </div>
        </Grid>

        <Grid item xs={6} className="total-prosumer-body">
          <div className="producer-information-right">
            <div className="chart-container">
              <Paper elevation={3}>
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

              <div
                style={{
                  marginTop: "40px",
                }}
              />

              <Paper elevation={3}>
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
                <AggQuantity />
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
