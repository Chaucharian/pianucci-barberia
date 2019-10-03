import React from 'react';
import {navigate} from 'hookrouter';
import Header from '../components/header';
import ReflectButton from '../components/reflectButton';
import { withStyles } from '@material-ui/styles';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100vh",
        marginTop: "76px"
    }
}

export const HomePage = (props) => {
    const { classes } = props;
    return (
        <div>
            <Header></Header>
            <div className={classes.content}>
                <ReflectButton text="ENTRAR"></ReflectButton>
                <ReflectButton text="SALIR"></ReflectButton>
                <ReflectButton text="ANDATE A LA CONCHA DE TU MADRE"></ReflectButton>
            </div>
        </div>
    );
}

export default withStyles(styles)(HomePage);