import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        "& svg": {
        transition: ".5s ease-in-out",
        animation: "spinner .6s linear infinite",
        color: "#FFF",
        fontSize: "35px",
    },
    }
}

export const Spinner = props => {
    const { classes, children, loading } = props;

    return (
        loading ? 
        <div className={classes.container}>
            {/* Ying Yang  */}
            <svg ariahidden="true" focusable="false" datahrefix="fas" dataicon="yin-yang" className="svg-inline--fa fa-yin-yang fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 376c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-128c-53.02 0-96 42.98-96 96s42.98 96 96 96c-106.04 0-192-85.96-192-192S141.96 64 248 64c53.02 0 96 42.98 96 96s-42.98 96-96 96zm0-128c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"></path></svg>
        </div>
        :
        children
    );
}

export default withStyles(styles)(Spinner);


