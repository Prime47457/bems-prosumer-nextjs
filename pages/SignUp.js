import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useAuth } from "../assets/auth";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().max(50, "Too Long!").required("Required"),
  surname: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
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
  role: Yup.string().required("Required"),
});

export default function LoginProsumer() {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const auth = useAuth();
  const router = useRouter();

  const signUp = ({
    name,
    surname,
    email,
    username,
    pass,
    building,
    floor,
    role,
  }) => {
    auth
      .signup(name, surname, email, username, pass, building, floor, role)
      .then(() => {
        router.push("/Login");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      username: "",
      pass: "",
      confirmpassword: "",
      building: "",
      floor: "",
      role: "",
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

        <div className="name-surname signup-textfield">
          <TextField
            id="name"
            name="name"
            className="name left-textfield"
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
            className="surname"
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
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
          {/* <TextField
            id="building"
            name="building"
            className="left-textfield"
            label="Building"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.building}
          /> */}
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
              helperText={formik.touched.building && formik.errors.building}
            >
              <MenuItem value="Cham5">Cham5</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            id="floor"
            name="floor"
            className="left-textfield"
            label="Floor"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.floor}
          /> */}
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
              helperText={formik.touched.floor && formik.errors.floor}
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
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
            <Select
              id="role"
              name="role"
              labelId="demo-simple-select-outlined-label"
              onChange={formik.handleChange}
              value={formik.values.role}
              label="Role"
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value="producer">Producer</MenuItem>
              <MenuItem value="consumer">Consumer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
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
          <p>Already have an account?</p>
          <Link href="/Login">
            <Button color="primary">Login</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
