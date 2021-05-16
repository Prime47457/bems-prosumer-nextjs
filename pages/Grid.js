import React, { useEffect, useState } from "react";
import GridInfo from "../components/GridInfo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Head from "next/head";
import { useAuth } from "../assets/auth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Grid() {
  const auth = useAuth();
  const user = auth.userId;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [backDrop, setBackDrop] = useState(false);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user)
        .get()
        .then((doc) => {
          setName(doc.data().name + " " + doc.data().surname);
        });
    }
  }, [user]);

  useEffect(() => {
    setBackDrop(true);
  }, []);

  console.log(backDrop);
  return (
    <div className="grid-page">
      <Backdrop className={classes.backdrop} open={backDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head>
        <title>Grid Information</title>
      </Head>
      <Navbar />
      <div className="grid-info">
        <div className="grid-name-block" />
        <div className="name-surname">
          <AccountCircleIcon />
          <h4>{name}</h4>
          <div
            style={{
              marginTop: "40px",
            }}
          />
        </div>
      </div>
      <GridInfo backdrop={setBackDrop} />
      <div className="grid-bottom"></div>
    </div>
  );
}
