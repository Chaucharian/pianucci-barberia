import React from 'react';
import { withStyles } from '@material-ui/styles';
import { colorScheme } from '../styles/styles';

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px", 
        backgroundColor: colorScheme.disabledOptions,
        color: "#000",
        borderRadius: "30px",
        fontFamily: "'Abril Fatface', cursive"
    },
    on: {
        backgroundColor: "#FFF", 
        width: "50px",
        height: "50px" 
    }
}

export const CicularNumberIndicator = (props) => {
    const { classes, number, on } = props; 
    
    return (
        <div className={classes.container + ' ' + (on ? classes.on : '')}>
           <p>{number}</p>
        </div>
    );
}

export default withStyles(styles)(CicularNumberIndicator);


