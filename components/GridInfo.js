import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

export default function GridInfo() {
  const [items, setItems] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
  ]);

  function FormRow() {
    return (
      <React.Fragment>
        {items.map((e) => {
          return (
            <Grid item xs={2.5}>
              <Paper>
                <div className="id">ID 0</div>
                <div className="kw">1 kW</div>
                <div className="kw">3 kW</div>
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="grid-container">
      <h2 className="information">Consumer Information</h2>

      <div className="textfield">
        <div className="textfield-search">
          <InputBase
            placeholder="Search for building/ solar PV/Grid"
            inputProps={{ "aria-label": "Search for building/ solar PV/Grid" }}
          />
          <IconButton className="search-icon" type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
