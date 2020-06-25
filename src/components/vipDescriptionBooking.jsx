import React from 'react';
import { withStyles } from '@material-ui/styles';
import ReflectButton from './reflectButton';

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        color: "#FFF"
    },
    bookings: {
        width: "60%",
        height: "300px",
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        alignItems: "center"
    },
    dateIndicator: {
        transition: "all 200ms ease",
        color: "red"
    }
}

export const VipDescriptionBooking = (props) => {
    const { classes, onConfirm } = props; 

    return (
        <div className={classes.container}>
            <h1>ESTE TURNO ES VIP PAPI AGARRATE EL OPI</h1>
            <ReflectButton text="CONFIRMAR" clicked={() => onConfirm("confirm")} />
        </div>
    );
}

export default withStyles(styles)(VipDescriptionBooking);


