import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

const CustomSelect = ({ label, classes, onChange, selection, children }) => (
  <FormControl className={classes.root}>
    <InputLabel>{label}</InputLabel>
    <Select
      displayEmpty={true}
      value={selection}
      onChange={({ target: { value } }) => onChange(label, value)}
    >
      {children.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles({
  root: {
    width: "100%",
    "& label": {
      color: "#615a5a",
    },
    "& div": {
      "& div": {
        color: "white",
      },
      "& svg": {
        color: "white",
      },
      "& :before": {
        borderBottomColor: "#615a5a",
      },
    },
  },
})(CustomSelect);
