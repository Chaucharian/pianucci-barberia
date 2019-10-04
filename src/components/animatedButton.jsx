import React from 'react';
import { withStyles} from '@material-ui/styles';

// font-family: 'Raleway', sans-serif;
// font-family: 'Source Sans Pro', sans-serif;

const styles = {
    button: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Raleway', sans-serif",
        fontSize: "calc(16px + (14 - 16) * (100vw - 400px) / (1440 - 400))",
        textDecoration: "none",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "1.5em 3.5em",
        border: "1px solid rgb(256, 256, 256)",
        boxShadow: "-5px 5px 0 0 white",
        backgroundColor: "#000",
        color: "#FFF",
        transition: "all 200ms ease",
        width: "100%",
        "&:hover": {
            boxShadow: "10px -10px 0 0 #FFF",
            transform: "translate(-5px, 5px)"
        }
    },
    boldFont: {
        fontWeight: "bold"
    }    
}

const AnimatedButton = (props) => {
    const { classes, text } = props;
    return <button className={classes.button +' '+ (props.strong ? classes.boldFont : '') }>{ text }</button>;
};

export default withStyles(styles)(AnimatedButton);