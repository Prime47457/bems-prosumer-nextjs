import React, { useState } from "react";
import GridInfo from "../components/GridInfo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Navbar from "../components/Navbar";

export default function Grid() {
  return (
    <div className="grid-page">
      <Navbar />
      <h4 className="name-surname">
        <AccountCircleIcon />
        Name Surname
      </h4>

      <div className="grid-info">
        <GridInfo />
        <GridInfo />
      </div>
    </div>
  );
}
