import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

export default function Navbar() {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon className="nav-icon">
            <HomeRoundedIcon />
          </NavIcon>
          <NavText>
            <div className="icon-text">Home</div>
          </NavText>
        </NavItem>

        <NavItem eventKey="charts">
          <NavIcon>
            <MenuRoundedIcon />
          </NavIcon>
          <NavText>
            <div className="icon-text">Menu</div>
          </NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>Market Information</NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>P2P Diagram</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="home">
          <NavIcon>
            <PermContactCalendarIcon />
          </NavIcon>
          <NavText>
            <div className="icon-text">Contact Us</div>
          </NavText>
        </NavItem>

        <NavItem eventKey="home">
          <NavIcon>
            <HelpRoundedIcon />
          </NavIcon>
          <NavText>
            <div className="icon-text">Information</div>
          </NavText>
        </NavItem>

        <NavItem eventKey="home">
          <NavIcon>
            <ExitToAppRoundedIcon />
          </NavIcon>
          <NavText>
            <div className="icon-text">Log Out</div>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
