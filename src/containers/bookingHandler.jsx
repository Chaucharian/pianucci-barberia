import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles';
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style
import StepIndicator from '../components/stepIndicator';
import ScheduleList from '../components/scheduleList';
import ViewSwitcher from '../components/viewSwitcher';
import ServiceTypeSelector from '../components/serviceTypeSelector';
import BookingConfirmation from '../components/bookingConfirmation';
import * as userActions from '../actions/user';

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
    },
}

export const BookingHandler = (props) => {
    const { classes, booking } = props; 
    const [internalState, changeInternalState] = useState({currentStep: 1, serviceSelected: '', date: null });
    const [state, dispatch] = useStateValue();
    const { currentStep, serviceSelected, date } = internalState;

    const startDate = new Date().getTime();
    const endDate = new Date().getDate()+3;
    const onChange = data => console.log(data);
    let mainContent = null;

    const handleBookingConfirmation = response => {
        if (response === 'confirm') {
            createBooking({ serviceSelected, date });
        } else {
            changeInternalState({ currentStep: 2 });
        }
    }

    const createBooking = (booking) => {
        dispatch(userActions.createBooking(booking));
    }

    const changeStep = (newStep) => {
        if(newStep < currentStep) {
            changeInternalState({ currentStep: newStep });
        }
    } 

    return (
        <div className={classes.container}>
            <h2>RESERVA UN TURNO</h2>
            <StepIndicator currentStep={currentStep} clicked={ step => changeStep(step) }></StepIndicator>
            <ViewSwitcher targetView={currentStep}>
                <ServiceTypeSelector serviceSelected={ service => changeInternalState({ currentStep: 2, serviceSelected: service })}></ServiceTypeSelector>
                <ScheduleList serviceSelected={ serviceSelected } items={[{ date: new Date()}, { date: new Date()}, { date: new Date()}]}></ScheduleList>
                <BookingConfirmation booking={ { date, serviceSelected } } response={ response => handleBookingConfirmation(response) }  ></BookingConfirmation>
            </ViewSwitcher>
        </div>
    );
}

export default withStyles(styles)(BookingHandler);


