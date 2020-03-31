import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& h1": {
            marginBottom: "0px"
        }
    },
    bookingListContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "60%",
        overflow: "auto",
        padding: "10px"
    },
    daySelector: {
        display: "flex",
        justifyContent: "center"
    }
}

const ScheduleHandler = props => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
   
    return (
        <div className={classes.container}>
            <h1>HORARIOS</h1>
        </div>
    );  
  }
  

export default withStyles(styles)(ScheduleHandler);
