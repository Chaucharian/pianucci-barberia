import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';
import ScheduleList from './scheduleList';
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
    },
}

export const BookingDateSelector = (props) => {
    const { classes, dates, dateSelected, serviceDuration } = props; 
    const [state, dispatch] = useState({ defaultDay: null});
     
    const setDefaultDay = () => {

    }

    
    return (
        <div className={classes.container}>
            BOOKING DATE SELECTOR
            <ScheduleList serviceDuration={ serviceDuration } items={[{ date: new Date()}, { date: new Date()}, { date: new Date()}]}></ScheduleList>
        </div>
    );
}

export default withStyles(styles)(BookingDateSelector);


