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

export const ViewSwitcher = (props) => {
    const { classes, targetView, children } = props; 

    return (
        <div className={classes.container}>
            { children[targetView] }
        </div>
    );
}

export default withStyles(styles)(ViewSwitcher);


