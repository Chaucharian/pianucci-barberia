import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        textAlign: "center",
        padding: "5px"
    }
}

const BookingList = (props) => {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingList);
