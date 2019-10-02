import React from 'react';
import {navigate} from 'hookrouter';
import Header from '../components/header';
import { withStyles } from '@material-ui/styles';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100vh"
    }
}

export const HomePage = (props) => {
    const { classes } = props;
    return (
        <div className={classes.content}>
            <Header></Header>
        </div>
    );
}

export default withStyles(styles)(HomePage);