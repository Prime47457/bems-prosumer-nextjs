import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Login.css";
import "../styles/SignUp.css";
import "../styles/Grid.css";
import "../styles/Navbar.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { AppProps } from "next/app";
import "fontsource-roboto";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
