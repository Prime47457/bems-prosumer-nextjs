import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Grid, Paper } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import dynamic from "next/dynamic";
import { useAuth } from "../../assets/auth";

const db = firebase.database();

const P2PChord = dynamic(
  () => {
    return import("../../components/charts/P2PChord");
  },
  { ssr: false }
);

export function getMarketStatus() {
  const date = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
    .substring(0, 10);
  // dont forget to change
  const dateHour = new Date().setMinutes(0, 0, 0);
  const status = db
    .ref("Market/admin")
    .child(date)
    .child(dateHour)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          date: date,
          clearMeth: data.clearing_method,
          kValue: data.k_value,
          percentBought: data.evaluationIndex.percent_bought,
          percentClear: data.evaluationIndex.percent_clear,
          percentSold: data.evaluationIndex.percent_sold,
        };
      } else {
        return {
          date: date,
          clearMeth: "",
          kValue: 0,
          percentBought: 0,
          percentClear: 0,
          percentSold: 0,
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return status;
}

export default function P2PDiagram() {
  const auth = useAuth();
  const [clearMeth, setClearMeth] = useState("");
  const [kValue, setKValue] = useState(0);
  const [penalty, seetPenalty] = useState(0.15);
  const [percentClear, setPercentClear] = useState(0);
  const [percentBought, setPercentBought] = useState(0);
  const [percentSold, setPercentSold] = useState(0);

  useEffect(() => {
    getMarketStatus().then((res) => {
      setClearMeth(res.clearMeth);
      setKValue(res.kValue);
      setPercentBought(res.percentBought);
      setPercentClear(res.percentClear);
      setPercentSold(res.percentSold);
    });
  }, []);

  return (
    <div className="grid-page">
      <Head>
        <title>P2P Diagram</title>
      </Head>
      <Navbar />

      <Grid container spacing={3} className="total-prosumer">
        <Grid item xs={8} className="total-prosumer-body">
          <div className="producer-information-left">
            <Paper>
              <P2PChord />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={4} className="total-prosumer-body">
          <div className="producer-information-right">
            <div className="prosumer-info-box1">
              <hr className="border-color" />
              <h3 className="building">Market Clearing Status</h3>
              <hr className="border-color building-line" />
              <div className="pv-load">
                <p className="load">
                  <strong>Clearing Method: </strong>
                  {clearMeth}
                </p>
              </div>
              <div className="pv-load">
                <p>
                  <strong>K value: </strong> {kValue}
                </p>
              </div>
              <div className="pv-load">
                <p>
                  <strong>Penalty: </strong> {penalty}
                </p>
              </div>
              <div className="pv-load">
                <p>
                  <strong>Percent Bought: </strong> {percentBought}
                </p>
              </div>
              <div className="pv-load">
                <p>
                  <strong>Percent Clear: </strong> {percentClear}
                </p>
              </div>
              <div className="pv-load">
                <p>
                  <strong>Percent Sold: </strong> {percentSold}
                </p>
              </div>
              <div
                style={{
                  marginTop: "90px",
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
