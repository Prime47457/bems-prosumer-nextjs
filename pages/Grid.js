import React, { useEffect, useState } from "react";
import GridInfo from "../components/GridInfo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Head from "next/head";
import { useAuth } from "../assets/auth";
import { useRadioGroup } from "@material-ui/core";

export default function Grid() {
  const auth = useAuth();
  const user = auth.userId;
  const [name, setName] = useState("");

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
  return (
    <div className="grid-page">
      <Head>
        <title>Grid Information</title>
      </Head>
      <div className="name-surname">
        <h4>
          <AccountCircleIcon />
          {name}
        </h4>
      </div>
      <Navbar />

      <div className="grid-info">
        <GridInfo />
      </div>
    </div>
  );
}
