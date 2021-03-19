import Head from "next/head";
import styles from "../styles/Home.module.css";
import { siteTitle } from "../components/main-menu";
import React, { useRef } from "react";
import Link from "next/link";

import Login from "./Login";

export default function Home() {
  return (

    Login()
    // styles.container is in home.module.css
    // <div className={styles.container}>
    //   <Head>
    //     <title>{siteTitle}</title>
    //   </Head>
    //   <main>
    //     <div className={styles.main}>
    //       <h1 className={styles.title}>Login</h1>
    //       <label className={styles.card}>
    //         Username: <input type="text" />
    //       </label>
    //       <label className={styles.card}>
    //         Password: <input type="password" />
    //       </label>
    //       <div>
    //         <Link href="/prosumers/indv-prosumer">
    //           <button type="submit">Log in</button>
    //         </Link>
    //         <Link href="/">
    //           <button type="submit">Sign up</button>
    //         </Link>
    //       </div>
    //     </div>
    //   </main>
    // </div>

    // <MainMenu>
    //   <Head>
    //     <title>{siteTitle}</title>
    //   </Head>
    //   <section className={styles.code}>
    //     <p>
    //       This is the home content of the webpage Which should be the login page
    //       however lets just use this for now.
    //     </p>
    //   </section>
    // </MainMenu>
  );
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Create Next App</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <main className={styles.main}>
  //       <h1 className={styles.title}>
  //         Welcome to <a href="https://nextjs.org">Next.js!</a>
  //       </h1>
  //       <p className={styles.description}>
  //         Get started by editing{' '}
  //         <code className={styles.code}>pages/index.js</code>
  //       </p>
  //       <div className={styles.grid}>
  //         <a href="https://nextjs.org/docs" className={styles.card}>
  //           <h3>Documentation &rarr;</h3>
  //           <p>Find in-depth information about Next.js features and API.</p>
  //         </a>
  //         <a href="https://nextjs.org/learn" className={styles.card}>
  //           <h3>Learn &rarr;</h3>
  //           <p>Learn about Next.js in an interactive course with quizzes!</p>
  //         </a>
  //         <a
  //           href="https://github.com/vercel/next.js/tree/master/examples"
  //           className={styles.card}
  //         >
  //           <h3>Examples &rarr;</h3>
  //           <p>Discover and deploy boilerplate example Next.js projects.</p>
  //         </a>
  //         <a
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //           className={styles.card}
  //         >
  //           <h3>Deploy &rarr;</h3>
  //           <p>
  //             Instantly deploy your Next.js site to a public URL with Vercel.
  //           </p>
  //         </a>
  //       </div>
  //     </main>
  //     <footer className={styles.footer}>
  //       <a
  //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Powered by{' '}
  //         <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
  //       </a>
  //     </footer>
  //   </div>
  // )
}
