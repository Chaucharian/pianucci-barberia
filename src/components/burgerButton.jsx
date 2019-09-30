import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        display: "block",
        backgroundColor: "transparent",
        outline: "none",
        width: "60px",
        height: "45px",
        position: "relative",
        margin: "50px auto",
        transform: "rotate(0deg)",
        transition: ".5s ease-in-out",
        cursor: "pointer",
        border: "none"
    },
    stripe: {
        display: "block",
        position: "absolute",
        left: "8px",
        height: "3px",
        width: "100%",
        background: "#FFF",
        borderRadius: "9px",
        opacity: "1",
        transition: ".25s ease-in-out",
        transformOrigin: "left center"
    },
    stripe1: {
        top: "0px",
    },
    stripe2: {
        top: "18px",
    },
    stripe3: {
        top: "36px",
    },
    stripe1Clicked: {
        transform: "rotate(45deg)",
        top: "-3px",
    },
    stripe2Clicked: {
        width: "0%",
        opacity: "0"         
    },
    stripe3Clicked: {
        transform: "rotate(-45deg)",
        top: "39px"
    },
    colorClicked: {
        background: "#000"
    }
}

const BugerButton = (props) => {
    const { classes, click } = props;
    const [clicked, changeState] = useState(false);

    const addClasses = stripeNumber => {
        let styleToAply = classes.stripe;
        switch(stripeNumber) {
            case 1:
                styleToAply += " "+classes.stripe1 +" "+ (clicked ? classes.stripe1Clicked +" "+ classes.colorClicked : "" );
                break;
            case 2:
                styleToAply += " "+ classes.stripe2 +" "+ (clicked ? classes.stripe2Clicked +" "+ classes.colorClicked : "" );
                break;
            case 3:
                styleToAply += " "+ classes.stripe3 +" "+ (clicked ? classes.stripe3Clicked +" "+ classes.colorClicked : "" );
                break;
        }
        return styleToAply;
    }

    return (
        <button className={classes.container} onClick={ () => {
            click(!clicked);
            changeState(!clicked) 
            }
        }>
            <span className={addClasses(1)}></span>   
            <span className={addClasses(2)}></span>
            <span className={addClasses(3)}></span>
        </button>   
    );
}

export default withStyles(styles)(BugerButton);
