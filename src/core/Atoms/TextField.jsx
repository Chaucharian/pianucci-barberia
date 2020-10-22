import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components'; 

const MaterialTextField = withStyles({
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

export const TextField = styld(MaterialTextField)` 
${({ error }) => `
    ${error && `
    & label: {
        color: red !important;
      }
      & div:before: {
        borderBottomColor: red !important,
      }
    `}
`}`;