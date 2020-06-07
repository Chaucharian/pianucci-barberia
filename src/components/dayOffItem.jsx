import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
    },
    crossButton: {
        outline: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "70px",
        color: "#FFF",
        border: "none",
        backgroundColor: "transparent",
        fontSize: "40px",
        transition: "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
        "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
        "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        "& :hover": {
            color: "#e21111"
        }
    }
}

const DayOffItem = (props) => {
    const { classes, nameDay, onDelete } = props;

    return (
        <div className={classes.container}>
            <h2>{ nameDay }</h2>
            <button className={classes.crossButton} onClick={() => onDelete(nameDay) }><i className="fas fa-times"></i></button>
        </div>
    );
}

export default withStyles(styles)(DayOffItem);