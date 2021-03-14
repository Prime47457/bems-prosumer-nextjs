import MainMenu from "../../components/main-menu";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import BarChart from "../../components/charts/BarChart";
import { Button } from "@material-ui/core";

export default function IndividualProsumer() {
  return (
    <div className="Widget">
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <main>
        <div className="Widget">One Widget</div>
        {/* <div className="Widget">Two widget</div>
        <div className="Widget">THree widget</div>
        <div className="Widget">Four Widget</div> */}
      </main>
    </div>
  );
}
