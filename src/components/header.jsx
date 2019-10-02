import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';
import { fonts } from '../styles/styles';

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0, 
        overflow: "auto",
        display: "flex",
        width: "100%",
        minHeight: "50px",
        backgroundColor: "#000",
        transition: ".5s ease-in-out"
    },
    open: {
        backgroundColor: "#FFF",
        height: "100vh" // TODO change to js window.height cause in mobile mode there's a bug with that shit
    },
    mainContent: {
        display: "flex",
        width: "100%",
        padding: "10px"
    },
    navbar: {
        width: "100%"
    },
    linksList: {
        display: "none",
        listStyle: "none",
        padding: "0px",
        textAlign: "right",
        color: "#FFF",
        // fontFamily: "'Montserrat', sans-serif",
        fontFamily: fonts.navbarLinks,
        fontWeight: "bolder",
        fontSize: "48px",
    },
    linksListVisible: {
        display: "block",
        color: "#000",
    },
    link: {
        "&:hover":{
            textDecoration: "line-through",
            cursor: "pointer",
            color: "#641b22"
        }
    }
}

const Header = (props) => {
    const { classes } = props;
    const [open, showNavbar] = useState(false);
    console.log(open);
    
    return (
        <header className={classes.header +' '+ (open ? classes.open : '')}>
            <div className={classes.mainContent}>
                <BurgerButton click={ clicked => showNavbar(clicked) } ></BurgerButton>
                <nav className={classes.navbar}>
                    <ul className={classes.linksList +' '+ (open ? classes.linksListVisible : '' )}>
                        <li className={classes.link}><a>INICIO</a></li>
                        <li className={classes.link}><a>TURNOS</a></li>
                        <li className={classes.link}><a>SALIR</a></li>
                    </ul> 
                </nav>
            </div>
        </header>
        
    );
}

export default withStyles(styles)(Header);