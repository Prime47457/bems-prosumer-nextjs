import React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

export const siteTitle = "CU P2P Electricity Trading";

export const Prime = () => {
  return <div></div>;
};

export default function Dashboard({ children }) {
  return (
    <div className="App">
      <Head>
        <meta
          name="description"
          content="P2P electricity trading real time dashboard."
        />
      </Head>
      <main>{children}</main>
    </div>
  );
}
