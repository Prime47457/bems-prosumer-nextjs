import MainMenu from "../../components/main-menu";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import BarChart from "../../components/charts/BarChart";
import { Button } from "@material-ui/core";

export default function IndividualProsumer() {
  return (
    <MainMenu>
      <Head>
        <title>Prosumer Information</title>
      </Head>
      <div className={styles.main}>
        <Link href="/">
          <Button variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>
      </div>
    </MainMenu>
  );
}
