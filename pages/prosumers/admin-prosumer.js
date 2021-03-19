import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  AggGenForecast,
  AggLoadForecast,
} from "../../components/charts/AggElectricityForecast";
import {
  AggSellForecast,
  AggBuyForecast,
} from "../../components/charts/AggTransactionForecast";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    height: 300,
    width: 300,
  },
}));

export default function AdminProsumer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs>
          <Paper className={classes.paper}>
            <AggLoadForecast />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <AggGenForecast />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <AggBuyForecast />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <AggSellForecast />
          </Paper>
        </Grid>
      </Grid>
      {/* <div>Load and Sale info</div>
      <div>Purchase info</div> */}
      <Link href="/">
        <Button variant="outlined" color="primary">
          Home
        </Button>
      </Link>
    </div>
  );
}
