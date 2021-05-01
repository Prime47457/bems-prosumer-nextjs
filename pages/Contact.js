import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useAuth } from "../assets/auth";

export default function Contact() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Navbar />

      {/* <div
          style={{
            marginRight: "40%",
          }}
        /> */}
      <div
        style={{
          width: "100%",
          marginTop: "40px",
          marginLeft: "120px",
          alignContent: "center",
        }}
      >
        <ContactSupportIcon />
        <h4>Please contact us at test1234@gmail.com</h4>
        <h4>Phone number: 0921324456</h4>
      </div>
    </div>
  );
}
