import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import Link from "next/link";
import { useAuth } from "../assets/auth";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Head from "next/head";

export default function Login() {
  const auth = useAuth();
  const router = useRouter();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const signIn = ({ email, pass }) => {
    auth
      .signin(email, pass)
      .then(() => {
        setOpenSuccess(true);
        setTimeout(() => {
          router.push("/Grid");
        }, 100);
      })
      .catch((error) => {
        setErrorMessage(error);
        setOpenError(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: (values) => {
      signIn(values);
    },
  });

  return (
    <div className="login">
      <Head>
        <title>Login Page</title>
      </Head>
      <h1 className="logo">
        CU
        <span className="logo-bems">{" BEMS"}</span>
      </h1>

      <form
        className=""
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="login-username-email login-textfield">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <div className="login-password login-textfield">
          <TextField
            id="pass"
            name="pass"
            label="Password"
            variant="outlined"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.pass}
          />
        </div>

        <div className="login-remember-pswd">
          {/* <FormControlLabel
            className="login-rememberme"
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Remember me"
          /> */}
          <a style={{ color: "#243aa1" }}>Forgot password?</a>
        </div>

        <div className="login-button">
          <Button
            className="login-button-fill"
            size="large"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>

      <div className="login-signup">
        <span>Don't have an account yet? </span>
        <Link href="/SignUp">
          <a style={{ color: "#243aa1" }}>Sign Up</a>
        </Link>
      </div>
      <Snackbar open={openSuccess} autoHideDuration={6000}>
        <Alert severity="success">
          <strong>Logged in</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert severity="error" onClose={handleErrorClose}>
          <AlertTitle>An error occurred</AlertTitle>
          {errorMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
