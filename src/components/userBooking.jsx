import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import  { getHours, isSameDay,format } from 'date-fns';
import Modal from '../components/modal';

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
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
        width: "100%",
        // height: "40px",
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
        width: "65%",
        padding: "5px",
        fontSize: "20px",
        "& p": {
            margin: "0px"
        }
    },
    time: {
        width: "15%",
        marginRight: "30px",
        fontSize: "30px",
        display: "flex",
        justifyContent: "center",
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
    const { classes, booking, isAdmin, onDelete } = props;
    const [ isModalOpen, showModal] = useState(false);
    const { date, status, name, phone } = booking;
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

    const descriptionToShow = () => {
        return (
            <>
                { name && 
                <>
                    <p>{ name.length >= 30 ? name.substring(0, 13) + "..." : name }</p>
                    <strong>{ phone }</strong>
                </> 
                }
                { !name && <p>{ dateFormated }</p> }
            </>
        );
    }

    const sameDay = () => isAdmin ? false : isSameDay(date, new Date());

    return (
        <>
            <Modal 
                onlyConfirm={sameDay()}
                open={isModalOpen} 
                title={sameDay() ?  "No puedes eliminar esta reserva" : "¿Seguro quieres eliminar esta reserva?" }
                content={ sameDay() ? "No puedes eliminar una reserva en la misma fecha que la creaste, contactate con la barberia para realizar este cambio" : "Una vez hecho tendras que crear una nueva reserva" }
                onAction={modalHandler}
            />
            <div className={classes.container +' '+ (isBookingReserved ? classes.active : classes.inactive) }>
                <div className={classes.description}>
                    { descriptionToShow()}
                </div>
                <div className={classes.time}>
                    <strong>{ hour }</strong>
                </div>
                { isBookingReserved && <button className={classes.crossButton} onClick={() => showModal(true)}><i className="fas fa-times"></i></button> }
            </div>
        </>
    );
}

export default withStyles(styles)(UserBooking);