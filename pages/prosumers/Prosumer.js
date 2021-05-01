import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Grid, Paper, TextField, MenuItem } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import historicalData from "../../data/historical/historicalData";
import historicalPrice from "../../data/historical/historicalPrice";
import updateChart from "../../data/current/updateChart";
import updateBuyPriceQuan, {
  updateSellPriceQuan,
  updateBarRankingPrice,
} from "../../data/current/updatePriceQuan";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../../assets/auth";

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

const Barranking = dynamic(
  () => {
    return import("../../components/charts/prosumer/Barranking");
  },
  { ssr: false }
);

export default function Prosumer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBuyDate, setSelectedBuyDate] = useState(new Date());
  const [selectedSellDate, setSelectedSellDate] = useState(new Date());
  const [name, setName] = useState("");
  const [buidling, setBuilding] = useState("");
  const [load, setLoad] = useState(0);

  const auth = useAuth();
  const user = auth.userId;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    firebase
      .firestore()
      .collection("users")
      .doc(user)
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
      user,
      "bought"
    );
  };

  const handleDateSellChange = (date) => {
    setSelectedSellDate(date);
    historicalPrice(
      date
        .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
        .substring(0, 10),
      user,
      "sold"
    );
  };

  useEffect(() => {
    if (
      user &&
      selectedDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      firebase
        .firestore()
        .collection("users")
        .doc(user)
        .get()
        .then((doc) => {
          const data = doc.data();
          const url = data.link;
          const floor = "Floor " + data.floor;
          updateChart(url, floor).then((res) => {
            setName(data.name + " " + data.surname);
            setBuilding(data.building + " Floor " + data.floor);
            setLoad(Number(Math.round(res.total + "e2") + "e-2"));
          });
        });
      if (
        selectedDate.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedDate(new Date());
      }
    }
  }, [selectedDate, user]);

  useEffect(() => {
    if (
      user &&
      selectedBuyDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateBuyPriceQuan(user);
      if (
        selectedBuyDate.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedBuyDate(new Date());
      }
    }
  }, [selectedBuyDate, user]);

  useEffect(() => {
    if (
      user &&
      selectedSellDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      updateSellPriceQuan(user);
      if (
        selectedSellDate.setHours(0, 0, 0, 0) !==
        new Date().setHours(0, 0, 0, 0)
      ) {
        setSelectedSellDate(new Date());
      }
    }
  }, [selectedSellDate, user]);

  useEffect(() => {
    if (user) {
      updateBarRankingPrice(user);
    }
  }, [user]);

  return (
    <div className="grid-page">
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <Navbar />

      <Grid container spacing={3} className="total-prosumer">
        <Grid item xs={6} className="total-prosumer-body">
          <div className="producer-information-left">
            <h1>Prosumer Information</h1>

            <div className="prosumer-info-box1">
              <p>Name: {name}</p>
              <hr className="border-color" />
              <p className="building">Building: {buidling}</p>
              <hr className="border-color building-line" />
              <div className="pv-load">
                <p className="load">Load: {load} kW</p>
                <p>PV: {0} kW</p>
              </div>
            </div>
            <div
              style={{
                marginTop: "40px",
              }}
            />
            <Paper>
              <Barranking />
            </Paper>
          </div>
        </Grid>

        <Grid item xs={6} className="total-prosumer-body">
          <div className="producer-information-right">
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

              <div
                style={{
                  marginTop: "40px",
                }}
              />

              <Paper>
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

              <div
                style={{
                  marginTop: "40px",
                }}
              />

              <Paper>
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
        </Grid>
      </Grid>
    </div>
  );
}
