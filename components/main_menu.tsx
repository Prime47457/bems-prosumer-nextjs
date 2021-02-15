import React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

export const siteTitle = "CU P2P Electricity Trading";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
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
