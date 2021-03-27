import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "next/link";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

export default function Login() {
  // const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="login">
      <h1 className="logo">
        CU
        <span className="logo-bems">{" BEMS"}</span>
      </h1>

      <form className="" noValidate autoComplete="off">
        <div className="login-username-email login-textfield">
          <TextField
            id="outlined-basic"
            label="Username/ Email"
            variant="outlined"
          />
        </div>

        <div className="login-password login-textfield">
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>

        <div className="login-remember-pswd">
          <FormControlLabel
            className="login-rememberme"
            control={
              <Checkbox
                checked={isChecked}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Remember me"
          />
          <p>Forgot password?</p>
        </div>

        <div className="login-button">
          <Link href="/">
            <Button
              className="login-button-fill"
              size="large"
              variant="contained"
            >
              Login
            </Button>
          </Link>
        </div>
      </form>

      <div className="login-signup">
        <p>Don't have an account yet?</p>

        <Link href="/SignUp">
          <Button color="primary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
