import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0, 
        overflow: "auto",
        display: "flex",
        width: "100%",
        backgroundColor: "#000",
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
        <header className={classes.header +' '+ (open ? classes.open : '')}>
            <div className={classes.mainContent}>
                <BurgerButton click={ clicked => showNavbar(clicked) } ></BurgerButton>
                <div className={classes.trasitionContent}></div>
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
        </header>
        
    );
}

export default withStyles(styles)(Navbar);