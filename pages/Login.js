import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useAuth } from "../assets/auth";
import { useRouter } from "next/router";
import { useFormik } from "formik";

export default function Login() {
  // const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();

  const signIn = ({ email, pass }) => {
    auth.signin(email, pass).then(() => {
      router.push("/Grid");
    });
  };

  const [isChecked, setIsChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: (values) => {
      signIn(values);
      // console.log(values);
    },
  });

  return (
    <div className="login">
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
        <p>Don't have an account yet?</p>

        <Link href="/SignUp">
          <Button color="primary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
