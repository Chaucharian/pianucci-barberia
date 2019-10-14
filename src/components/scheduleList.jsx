import React from 'react';
import { withStyles } from '@material-ui/styles';
import ScheduleItem from './scheduleItem';

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        color: "#FFF"
    }
}

export const ScheduleList = (props) => {
    const { classes, items } = props; 

    return (
        <div className={classes.container}>
            {items.map( (item, index) => <ScheduleItem key={index} date={item.date}></ScheduleItem>)}
        </div>
    );
}

export default withStyles(styles)(ScheduleList);


