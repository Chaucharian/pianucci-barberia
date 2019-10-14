import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& div": {
            height: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& h2": {
                fontWeight: "lighter",
            }
        }
    }
}

export const BookingHandler = (props) => {
    const { classes, booking } = props; 
    const [state, dispatch] = useStateValue();
    const { isDealing } = state;

    return (
        <div className={classes.container}>
            <h2>BOOKING HANDLER PAPA!</h2>
        </div>
    );
}

export default withStyles(styles)(BookingHandler);


