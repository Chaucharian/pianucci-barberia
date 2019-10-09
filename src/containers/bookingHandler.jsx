import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import Header from '../components/header';
import ReflectButton from '../components/reflectButton';
import ReactPageScroller from "react-page-scroller";
import { withStyles } from '@material-ui/styles';
import corte1 from '../assets/corte1.jpg';
import corte2 from '../assets/corte2.jpg';
import corte3 from '../assets/corte3.jpg';
import ImageSlideGalery from '../components/imageSlideGalery';
import BookingList from './bookingList';

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


