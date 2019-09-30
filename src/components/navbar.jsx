import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';

const styles = {
    navBar: {
        position: "fixed",
        top: 0,
        left: 0, 
        overflow: "auto",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        borderBottom: "solid 1px #FFF",
        transition: ".5s ease-in-out"
    },
    open: {
        backgroundColor: "#FFF"
    },
    mainContent: {
        display: "block",
        width: "100%",
        "& nav > ul": {
            listStyle: "none",
            padding: "0px",
            textAlign: "center",
            color: "#000",
            "& > li:hover": {
                textDecoration: "line-through",
                cursor: "pointer"
            }
        }
    }
}

const Navbar = (props) => {
    const { classes } = props;
    const [open, showNavbar] = useState(false);
    console.log(open);
    
    return (
        <div className={classes.navBar +' '+ (open ? classes.open : '')}>
            <div className={classes.mainContent}>
                <BurgerButton click={ clicked => showNavbar(clicked) } ></BurgerButton>
                <nav>
                {( open ? 
                    <ul>
                        <li><a>INICIO</a></li>
                        <li><a>TURNOS</a></li>
                        <li><a>SALIR</a></li>
                    </ul> 
                    : "")}
                </nav>
            </div>
        </div>
        
    );
}

export default withStyles(styles)(Navbar);