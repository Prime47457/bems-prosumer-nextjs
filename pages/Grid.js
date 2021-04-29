import React, { useEffect, useState } from "react";
import GridInfo from "../components/GridInfo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Head from "next/head";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_SENDER_ID,
  appId: "1:1083389397572:web:1470b861f0c2209e9b8a11",
  measurementId: "G-JQXCS7B1JK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Grid() {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name + " " + doc.data().surname);
      });
  }, []);
  return (
    <div className="grid-page">
      <Head>
        <title>Grid Information</title>
      </Head>
      <Navbar />
      <h4 className="name-surname">
        <AccountCircleIcon />
        {name}
      </h4>

      <div className="grid-info">
        <GridInfo />
      </div>
    </div>
  );
}
