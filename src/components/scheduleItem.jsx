import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        color: "#FFF"
    }
}

export const ScheduleItem = (props) => {
    const { classes, date } = props; 

    return (
        <div className={classes.container}>
            <p>{date.getDate()}</p>
            <button>RESERVAR</button>
            <button>NO SE PUEDE</button>
        </div>
    );
}

export default withStyles(styles)(ScheduleItem);


