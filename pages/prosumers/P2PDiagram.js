import Head from "next/head";
import React from "react";
import Navbar from "../../components/Navbar";
import { Grid, Paper } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import dynamic from "next/dynamic";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.NEXT_APP_FIREBASE_REALTIMEDBURL,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_SENDER_ID,
  appId: "1:1083389397572:web:1470b861f0c2209e9b8a11",
  measurementId: "G-JQXCS7B1JK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const P2PChord = dynamic(
  () => {
    return import("../../components/charts/P2PChord");
  },
  { ssr: false }
);

export default function P2PDiagram() {
  return (
    <div className="grid-page">
      <Head>
        <title>P2P Diagram</title>
      </Head>
      <Navbar />

      <Grid container>
        <Grid item xs={10} className="total-prosumer-body">
          <div className="producer-information-right">
            <Paper elevation={3}>
              <P2PChord />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
