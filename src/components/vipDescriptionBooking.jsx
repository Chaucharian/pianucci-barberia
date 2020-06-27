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
        color: "#FFF",
    },
    description: {
        paddingRight: "25px",
        paddingLeft: "25px",
        "& h3": {
            fontWeight: "lighter"
        }
    },
    bookings: {
        width: "60%",
        height: "300px",
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        alignItems: "center"
    },
    button: {
        display: "flex"
    }
}

export const VipDescriptionBooking = (props) => {
    const { classes, onConfirm } = props; 

    return (
        <div className={classes.container}>
            <div className={classes.description}>
                <h2>Reserva especial</h2>
                <h3>Esta es una cita totalmente personalizada, sin tiempo límite para estar en todo detalle,
                    servicio completo de corte, barba, cejas y diseño a coordinar con el barbero.<br></br> Además incluye sesión de fotos y video.
                </h3>
            </div>
            <div className={classes.button} >
                <ReflectButton text="ESTOY DE ACUERDO" clicked={() => onConfirm("confirm")} />
            </div>
        </div>
    );
}

export default withStyles(styles)(VipDescriptionBooking);


