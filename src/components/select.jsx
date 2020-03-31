import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const CustomSelect = ({ label, classes, onChange, selection, children }) => (
    <FormControl className={classes.root}>
        <InputLabel>{label}</InputLabel>
        <Select
            value={selection}
            onChange={ ({target: { value } }) => onChange(label, value) }
        >
            {children.map((value, index) => <MenuItem key={index} value={value}>{value}</MenuItem>)}
        </Select>
    </FormControl>
);

export default withStyles({
    root: {
        '& label': {
            color: "#615a5a",
        },
        "& div": {
            "& div": {
                color: "white"
            },
            "& svg": {
                color: "white"
            },
            "& :before": {
                borderBottomColor: "#615a5a"
            }
        },
        // "& div:after": {
        //     borderBottomColor: "#FFF",
        // },
        // '& label.Mui-focused': {
        //     color: '#FFF',
        // },
        // '& .MuiInput-underline:after': {
        //     borderBottomColor: '#FFF',
        // },
        // '& .MuiOutlinedInput-root': {
        // '& fieldset': {
        //     borderColor: '#FFF',
        // },
        // '&:hover fieldset': {
        //     borderColor: '#FFF',
        // },
        // '&.Mui-focused fieldset': {
        //     borderColor: '#FFF',
        // },
    //   },
    },
  })(CustomSelect);

