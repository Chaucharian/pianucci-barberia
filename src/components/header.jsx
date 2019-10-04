import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';
import { fonts, colorScheme } from '../styles/styles';
import logo from '../assets/logo.png';

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0, 
        overflow: "auto",
        display: "block",
        zIndex: "1000",
        width: "100%",
        height: "65px",
        minHeight: "50px",
        backgroundColor: "#000",
        borderBottom: "1px solid #FFF",
        transition: ".5s ease-in-out",
        padding: "10px 0px 0px 10px"
    },
    open: {
        backgroundColor: "#FFF",
        height: "100vh" // TODO change to js window.height cause in mobile mode there's a bug with that shit
    },
    barContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    navbar: {
        transition: ".5s ease-in-out",
        width: "100%"
    },
    navbarHidden: {
        opacity: 0,
    },
    linksList: {
        display: "none",
        listStyle: "none",
        padding: "0px",
        textAlign: "right",
        color: "#FFF",
        fontFamily: fonts.navbarLinks,
        fontWeight: "bolder",
        fontSize: "48px",
        margin: "15px",
        "& li": {
            "&:hover": {
                textDecoration: "line-through",
            },
            "& a": {
                cursor: "pointer"
            }
        }
    },
    linksListVisible: {
        display: "block",
        color: "#000",
    },
    logo: {
        transition: "2s ease-in-out",
        width: "160px",
        height: "59px",
        "& span": {
            width: "100%",
            height: "100%",
            display: "flex",
            background: `url(${logo})`,
            backgroundPosition: "-5px -6px",
        }
    },
    logoHidden: {
        opacity: 0,
        transform: "translateY(-10px)",
        transition: ".1s ease-in-out"
    }
}

const Header = (props) => {
    const { classes } = props;
    const [open, showNavbar] = useState(false);
    
    return (
        <header className={classes.header +' '+ (open ? classes.open : '')}>
            <div className={classes.barContainer}>
                <BurgerButton click={ clicked => showNavbar(clicked) } ></BurgerButton>
                <div className={classes.logo +' '+ (open ? classes.logoHidden : '' )}>
                    <span></span>
                </div>
            </div>
            <nav className={classes.navbar +' '+ (open ? '' : classes.navbarHidden )}>
                <ul className={classes.linksList +' '+ (open ? classes.linksListVisible : '' )}>
                    <li><a>INICIO</a></li>
                    <li><a>TURNOS</a></li>
                    <li><a>SALIR</a></li>
                </ul> 
            </nav>
        </header>
        
    );
}

export default withStyles(styles)(Header);