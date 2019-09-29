import React from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';

const styles = {
    navBar: {
        width: "100%",
        height: "80px",
        backgroundColor: "#000",
        borderBottom: "solid 1px #FFF"
    }
}

const NavBar = (props) => {
    const { classes } = props;
    
    return (
        <div className={classes.navBar}>
            <BurgerButton></BurgerButton>
            <nav>
                <ul>
                    <li><a>INICIO</a></li>
                    <li><a>TURNOS</a></li>
                    <li><a>SALIR</a></li>
                </ul>
            </nav>
        </div>
        
    );
}

export default withStyles(styles)(NavBar);