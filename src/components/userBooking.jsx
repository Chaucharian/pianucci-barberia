import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import  { getHours, format } from 'date-fns';
import Modal from '../components/modal';

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0px",
        padding: "0px",
        outline: "none",
        alignItems: "center",
        fontFamily: "'Raleway', sans-serif",
        fontSize: "calc(16px + (14 - 16) * (100vw - 400px) / (1440 - 400))",
        textDecoration: "none",
        textTransform: "uppercase",
        textAlign: "center",
        border: "1px solid rgb(256, 256, 256)",
        backgroundColor: "#000",
        color: "#FFF",
        transition: "all 200ms ease",
        width: "80%",
        height: "40px",
        transition: "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
        "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
        "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
    },
    active: {
        boxShadow: "-5px 5px 0 0 white"
    },
    inactive: {
        boxShadow: "-5px 5px 0 0 #636161"
    },
    description: {
        width: "100%",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        "& p": {
            margin: "0px"
        }
    },
    crossButton: {
        outline: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "70px",
        border: "none",
        backgroundColor: "#FFF",
        fontSize: "40px",
        transition: "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
        "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
        "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        "& :hover": {
            color: "#e21111"
        }
    }
}

const UserBooking = (props) => {
    const { classes, booking, onDelete } = props;
    const [ isModalOpen, showModal] = useState(false);
    const { date, status } = booking;
    const dateFormated = format(date,"dd/MM/yyyy");
    const hour = getHours(date) >= 10 ? getHours(date)+":00" : "0"+getHours(date)+":00";
    const isBookingReserved = status === 'reserved';

    const modalHandler = action => {
        if(action === "confirm") {
            showModal(false);
            onDelete(booking);
        } else {
            showModal(false);
        }
    }

    return (
        <>
            <Modal 
                open={isModalOpen} 
                title="¿Seguro quieres eliminar tu reserva?" 
                content="Una vez hecho tendras que crear una nueva reserva"
                onAction={modalHandler}
            />
            <div className={classes.container +' '+ (isBookingReserved ? classes.active : classes.inactive) }>
                <div className={classes.description}>
                    <p>{ dateFormated }</p>
                    <strong>{ hour }</strong>
                </div>
                { isBookingReserved && <button className={classes.crossButton} onClick={() => showModal(true)}><i className="fas fa-times"></i></button> }
            </div>
        </>
    );
}

export default withStyles(styles)(UserBooking);