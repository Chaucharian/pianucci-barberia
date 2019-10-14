import React from 'react';
import { withStyles } from '@material-ui/styles';
import CircularNumberIndicator from './circularNumberIndicator';

const styles = {
    container: {
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
}

export const stepIndicator = (props) => {
    const { classes, currentStep } = props; 

    return (
        <div className={classes.container}>
            <CircularNumberIndicator number={1} on={currentStep === 1}></CircularNumberIndicator>
            <CircularNumberIndicator number={2} on={currentStep === 2}></CircularNumberIndicator>
            <CircularNumberIndicator number={3} on={currentStep === 3}></CircularNumberIndicator>
        </div>
    );
}

export default withStyles(styles)(stepIndicator);


