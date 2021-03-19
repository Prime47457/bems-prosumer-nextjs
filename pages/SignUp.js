import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function LoginProsumer() {
  const [isChecked, setIsChecked] = useState(false);
  const [accountType, setAccountType] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="signup">
      <form noValidate autoComplete="off">

        <div className="signup-signup">
          <h1>Sign Up</h1>
        </div>

        <div className="name-surname signup-textfield" >
          <TextField className="name left-textfield" id="outlined-basic" label="First Name" variant="outlined" />
          <TextField className="surname" id="outlined-basic" label="Last Name" variant="outlined" />
        </div>

        <div className="email-username signup-textfield">
          <TextField className="left-textfield" id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Username" variant="outlined" />
        </div>

        <div className="pswd-cfpswd signup-textfield">
          <TextField className="left-textfield" id="outlined-basic" label="Password" variant="outlined" />
          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
        </div>

        <div className="bld-floor-acc signup-textfield">
          <TextField className="left-textfield" id="outlined-basic" label="Building" variant="outlined" />
          <TextField className="left-textfield" id="outlined-basic" label="Floor" variant="outlined" />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Account Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={accountType}
              // onChange={handleChange}
              label="Account Type" c
            >

              <MenuItem value={10}>Prosumer</MenuItem>
              <MenuItem value={20}>Admin</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="signup-button">
          <Link href='/'>
            <Button className="signup-button-fill" variant="contained">Sign Up</Button>
          </Link>
        </div>

        <div className="signup-login">
          <p>Already have an account?</p>
          <Link href='/Login'>
            <Button color="primary">Login</Button>
          </Link>
        </div>

      </form>
    </div>
  );
}