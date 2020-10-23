import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components'; 

const CustomTextField = withStyles({
  root: {
    "& label": {
      color: "#615a5a",
    },
    "& div": {
      color: "#FFF",
    },
    "& div:before": {
      borderBottomColor: "#615a5a",
    },
    "& div:after": {
      borderBottomColor: "#FFF",
    },
    "& label.Mui-focused": {
      color: "#FFF",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  },
})(TextField);

export default styled(CustomTextField)` 
${({ error }) => `
    width: 100%;
    ${error && `
    & label: {
        color: red !important;
      }
      & div:before: {
        borderBottomColor: red !important,
      }
    `}
`}`;