import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles';
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style


const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF"
    },
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
}

export const BookingHandler = (props) => {
    const { classes, booking } = props; 
    const [state, dispatch] = useStateValue();
    const { isDealing } = state;
    const startDate = new Date().getTime();
    const endDate = new Date().getDate()+3;
    const onChange = data => console.log(data);
    return (
        <div className={classes.container}>
            <h2>BOOKING HANDLER PAPA!</h2>
            <div className={classes.content}>
                <Calendar startDate={startDate} endDate={endDate} onChange={onChange} />
            </div>
        </div>
    );
}

export default withStyles(styles)(BookingHandler);


