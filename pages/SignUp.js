import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle, Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useAuth } from "../assets/auth";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().max(50, "Too Long!").required("Required"),
  surname: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  pass: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmpassword: Yup.string("Please Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("pass")], "Password does not match"),
  building: Yup.string().required("Required"),
  floor: Yup.string().required("Required"),
  link: Yup.string().required("Required"),
});

export default function LoginProsumer() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const auth = useAuth();
  const router = useRouter();

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const signUp = ({ name, surname, email, pass, building, floor, link }) => {
    auth
      .signup(name, surname, email, pass, building, floor, link)
      .then(() => {
        setOpenSuccess(true);
        setTimeout(() => {
          router.push("/Login");
        }, 100);
      })
      .catch((error) => {
        setErrorMessage(error);
        setOpenError(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      pass: "",
      confirmpassword: "",
      building: "",
      floor: "",
      link: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  return (
    <div className="signup">
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="signup-signup">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-textfield">
          <TextField
            id="name"
            name="name"
            className="left-textfield"
            label="First Name"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="surname"
            name="surname"
            label="Last Name"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.surname}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
        </div>

        <div className="email-username signup-textfield">
          <TextField
            id="email"
            name="email"
            className="left-textfield"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div className="pswd-cfpswd signup-textfield">
          <TextField
            id="pass"
            name="pass"
            className="left-textfield"
            label="Password"
            type="password"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.pass}
            error={formik.touched.pass && Boolean(formik.errors.pass)}
            helperText={formik.touched.pass && formik.errors.pass}
          />
          <TextField
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
            error={
              formik.touched.confirmpassword &&
              Boolean(formik.errors.confirmpassword)
            }
            helperText={
              formik.touched.confirmpassword && formik.errors.confirmpassword
            }
          />
        </div>

        <div className="bld-floor-acc signup-textfield">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Building
            </InputLabel>
            <Select
              id="building"
              name="building"
              labelId="demo-simple-select-outlined-label"
              onChange={formik.handleChange}
              value={formik.values.building}
              label="Building"
              error={formik.touched.building && Boolean(formik.errors.building)}
            >
              <MenuItem value="Cham5">Cham5</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Floor
            </InputLabel>
            <Select
              id="floor"
              name="floor"
              labelId="demo-simple-select-outlined-label"
              onChange={formik.handleChange}
              value={formik.values.floor}
              label="Floor"
              error={formik.touched.floor && Boolean(formik.errors.floor)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="signup-textfield">
          <TextField
            id="link"
            name="link"
            className="left-textfield"
            label="Floor API Link"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.link}
            error={formik.touched.link && Boolean(formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
          />
        </div>

        <div className="signup-button">
          <Button
            className="signup-button-fill"
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
        </div>

        <div className="signup-login">
          <span>Already have an account?</span>
          <Link href="/Login">
            <a style={{ color: "#243aa1" }}>Login</a>
          </Link>
        </div>
      </form>
      <Snackbar open={openSuccess} autoHideDuration={6000}>
        <Alert severity="success">
          <AlertTitle>Success!</AlertTitle>
          Your account has been — <strong>created</strong>.
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
