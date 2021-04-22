import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import axios from "axios";

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

export default function GridInfo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(async (snapshot) => {
        const userData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const date = new Date()
              .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
              .substring(0, 10);
            const load = await axios.get(data.link).then((res) => {
              return res.data.graph
                .filter((point) => {
                  const compareDate = new Date().setMinutes(0, 0, 0);
                  return new Date(point.x).setMinutes(0, 0, 0) === compareDate;
                })
                .reduce((acc, cur) => {
                  return acc + cur.y;
                }, 0);
            });
            const priceQuan = await firebase
              .database()
              .ref("Prosumer")
              .child(doc.id)
              .child(date)
              .get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  return Object.entries(snapshot.val())
                    .filter(([key, res]) => {
                      return (
                        new Date(parseInt(key)).setMinutes(0, 0, 0) ===
                        new Date().setMinutes(0, 0, 0)
                        // new Date(parseInt(key)).setMinutes(0, 0, 0) ===
                        // 1619103600000
                      );
                    })
                    .map(([key, res]) => {
                      const buyPrice = res.bought.reduce(
                        (acc, cur) => {
                          acc.sum += cur.price * cur.quantity;
                          acc.quantity += cur.quantity;
                          return acc;
                        },
                        { sum: 0, quantity: 0 }
                      );
                      const avgBuyPrice = buyPrice.sum / buyPrice.quantity;
                      const sellPrice = res.sold.reduce(
                        (acc, cur) => {
                          acc.sum += cur.price * cur.quantity;
                          acc.quantity += cur.quantity;
                          return acc;
                        },
                        { sum: 0, quantity: 0 }
                      );
                      const avgSellPrice = sellPrice.sum / sellPrice.quantity;
                      return {
                        avgBuyPrice,
                        buyQuan: buyPrice.quantity,
                        avgSellPrice,
                        sellQuan: sellPrice.quantity,
                      };
                    });
                } else {
                  return [
                    {
                      avgBuyPrice: 0,
                      buyQuan: 0,
                      avgSellPrice: 0,
                      sellQuan: 0,
                    },
                  ];
                }
              });
            return {
              uid: doc.id,
              floor: "Floor " + data.floor,
              load: Number(Math.round(load + "e2") + "e-2"),
              buyPrice: Number(
                Math.round(priceQuan[0].avgBuyPrice + "e2") + "e-2"
              ),
              buyQuan: priceQuan[0].buyQuan,
              sellPrice: Number(
                Math.round(priceQuan[0].avgSellPrice + "e2") + "e-2"
              ),
              sellQuan: priceQuan[0].sellQuan,
            };
          })
        );
        setItems(userData);
      });
  }, []);

  function FormBuyRow() {
    return (
      <React.Fragment>
        {items.map((e) => {
          return (
            <Grid item xs={2.5}>
              <Paper>
                <div className="id">{e.floor}</div>
                <div
                  className="kw"
                  style={{ color: e.load > 5 ? "#e1bd50" : "#243aa1" }}
                >
                  Load: {e.load} kW
                </div>
                <div
                  className="kw"
                  style={{ color: e.buyPrice > 3.5 ? "#ff0000" : "#243aa1" }}
                >
                  Price: {e.buyPrice} baht
                </div>
                <div
                  className="kw"
                  style={{ color: e.buyQuan > 5 ? "#ff0000" : "#243aa1" }}
                >
                  Quantity: {e.buyQuan} kW
                </div>
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  function FormSellRow() {
    return (
      <React.Fragment>
        {items.map((e) => {
          return (
            <Grid item xs={2.5}>
              <Paper>
                <div className="id">{e.floor}</div>
                <div
                  className="kw"
                  style={{ color: e.load > 5 ? "#e1bd50" : "#243aa1" }}
                >
                  Load: {e.load} kW
                </div>
                <div
                  className="kw"
                  style={{ color: e.sellPrice > 3.5 ? "#ff0000" : "#243aa1" }}
                >
                  Price: {e.sellPrice} baht
                </div>
                <div
                  className="kw"
                  style={{ color: e.sellQuan > 4 ? "#ff0000" : "#243aa1" }}
                >
                  Quantity: {e.sellQuan} kW
                </div>
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="grid-container">
      <h2 className="information">Producer Information</h2>

      <div className="textfield">
        <div className="textfield-search">
          <InputBase
            placeholder="Search for building/ solar PV/Grid"
            inputProps={{ "aria-label": "Search for building/ solar PV/Grid" }}
          />
          <IconButton className="search-icon" type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormSellRow />
          </Grid>
        </Grid>
      </div>
      <h2 className="information">Consumer Information</h2>

      <div className="textfield">
        <div className="textfield-search">
          <InputBase
            placeholder="Search for building/ solar PV/Grid"
            inputProps={{ "aria-label": "Search for building/ solar PV/Grid" }}
          />
          <IconButton className="search-icon" type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormBuyRow />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
