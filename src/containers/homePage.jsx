import React from 'react';
import {navigate} from 'hookrouter';
import Navbar from '../components/navbar';
import { withStyles } from '@material-ui/styles';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100%"
    }
}

export const HomePage = (props) => {
    const { classes } = props;
    return (
        <div className={classes.content}>
            <Navbar></Navbar>
        </div>
    );
}

export default withStyles(styles)(HomePage);