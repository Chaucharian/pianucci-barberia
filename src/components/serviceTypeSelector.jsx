import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        display: "flex",
        flexGrow: 1,
        color: "#FFF",
        "& button": {
            border: "2px solid #2e2e2e",
            cursor: "pointer",
            letterSpacing: "0.2125rem",
            overflow: "hidden",
            margin: "5px",
            padding: "20px 30px",
            position: "relative",
            backgroundColor: "#000",
            textAlign: "center",
            textTransform: "uppercase",
            outline: "0px",
            transition: "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
                "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
                "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        }
    }
}

export const ServiceTypeSelector = (props) => {
    const { classes, serviceSelected } = props; 

    return (
        <div className={classes.container}>
            <button onClick={serviceSelected('classic')}>
                CLASSIC
            </button>
            <button onClick={serviceSelected('complete')}>
                COMPLETE
            </button>
            <button onClick={serviceSelected('deluxe')}>
                DELUXE
            </button>
        </div>
    );
}

export default withStyles(styles)(ServiceTypeSelector);


