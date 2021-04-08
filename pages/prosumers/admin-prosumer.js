import React from "react";
import Head from "next/head";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";

const AggLoadForecast = dynamic(
  () => {
    return import("../../components/charts/AggElectricityForecast");
  },
  { ssr: false }
);

export default function AdminProsumer() {
  return (
    <div className="grid-page">
      <Head>Total Prosumer Information</Head>
      <Navbar />
      <div>
        <AggLoadForecast />
      </div>
    </div>
  );
}
