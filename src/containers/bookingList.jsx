import React, { useRef, useEffect, useState } from 'react'
import { useStateValue } from '../state/rootState';
import { withStyles } from '@material-ui/styles'
import RealBarberButton from '../components/realBarberButton';

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px"
    }
}

const BookingList = (props) => {
    const { classes } = props;
    const [state, setState] = useStateValue();
    console.log(state)
    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <RealBarberButton text={'reservar turno'}></RealBarberButton>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingList);
