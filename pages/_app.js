import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Login.css";
import "../styles/Signup.css";
import "../styles/Grid.css";
import "../styles/Navbar.css";
import "../styles/Admin.css";
import "../styles/Prosumer.css";
import "../styles/P2P.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { ProvideAuth } from "../assets/auth";
import "fontsource-roboto";

function App({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default App;
