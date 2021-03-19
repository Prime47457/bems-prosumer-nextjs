import "../styles/globals.css";
import "../styles/Widget.css";
import "../styles/App.css";
import '../styles/Login.css';
import '../styles/SignUp.css';
import { AppProps } from "next/app";


function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
