import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import ClickOutside from "react-click-outside";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle, Alert } from "@material-ui/lab";
import { useAuth } from "../assets/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const auth = useAuth();
  const router = useRouter();
  const [navbar, setNavbar] = useState({ expanded: false });
  const [openSuccess, setOpenSuccess] = useState(false);

  const signOut = () => {
    auth.signout().then(() => {
      setOpenSuccess(true);
      setTimeout(() => {
        router.push("/Login");
      }, 1000);
    });
  };

  return (
    <ClickOutside
      onClickOutside={() => {
        setNavbar({ expanded: false });
      }}
    >
      <SideNav
        onSelect={(selected) => {
          if (selected == "logout") {
            signOut();
          } else {
            const route = "/" + selected;
            router.push(route);
          }
        }}
        expanded={navbar.expanded}
        onToggle={(expand) => {
          setNavbar({ expanded: expand });
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav>
          <NavItem eventKey="Grid" className="nav-item">
            <NavIcon className="nav-icon">
              <HomeRoundedIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Home</div>
            </NavText>
          </NavItem>

          <NavItem eventKey="prosumers">
            <NavIcon>
              <MenuRoundedIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Menu</div>
            </NavText>
            <NavItem eventKey="prosumers/Admin">
              <NavText>
                {/* Don't forget to look at what should be display and what should not be displayed */}
                Market Information
              </NavText>
            </NavItem>
            <NavItem eventKey="prosumers/Prosumer">
              <NavText>
                {/* Don't forget to look at what should be display and what should not be displayed */}
                Prosumer Information
              </NavText>
            </NavItem>
            <NavItem eventKey="prosumers/p2p">
              <NavText>P2P Diagram</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="contact">
            <NavIcon>
              <PermContactCalendarIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Contact Us</div>
            </NavText>
          </NavItem>

          {/* Don't forget to put button */}
          <NavItem eventKey="information">
            <NavIcon>
              <HelpRoundedIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Information</div>
            </NavText>
          </NavItem>

          <NavItem
            eventKey="reAdmin"
            className="nav-item"
            // style={{ display: "none" }}
          >
            <NavIcon>
              <SupervisorAccountIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Register Admin</div>
            </NavText>
          </NavItem>

          <NavItem eventKey="logout">
            <NavIcon>
              <ExitToAppRoundedIcon />
            </NavIcon>
            <NavText>
              <div className="icon-text">Log Out</div>
            </NavText>
          </NavItem>
        </SideNav.Nav>
        <Snackbar open={openSuccess} autoHideDuration={6000}>
          <Alert severity="success">
            <AlertTitle>Success!</AlertTitle>
            You have <strong>Logged out</strong>.
          </Alert>
        </Snackbar>
      </SideNav>
    </ClickOutside>
  );
}
