import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import BurgerButton from './burgerButton';
import { fonts, colorScheme } from '../styles/styles';
import otra from "../assets/a.png";
import logoImage from '../assets/logo.png';
import darkLogoImage from '../assets/dark_logo.png';

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
            background: `url(${logoImage})`,
            backgroundPosition: "-5px -6px",
        }
    },
    logoHidden: {
        opacity: 0,
        transform: "translateY(-10px)",
        transition: ".1s ease-in-out"
    },
    logoBlack: {
        width: "150px",
        height: "70px",
        marginTop: "86%",
        marginLeft: "auto",
        marginRight: "auto",
        opacity: 0,
        transition: "1s ease-in-out",
        // display: "none",
        "& span": {
            display: "block",
            width: "100%",
            height: "100%",
            background: "url("+darkLogoImage+")",
        }
    },
    logoBlackVisible: {
        opacity: 1,
        // display: "block",
        transform: "translateY(-15px)",
        transition: ".5s ease-in-out"
    },
    logoBlackHidden: {
        opacity: 0,
        transform: "translateX(-400px)",
        transition: ".1s ease-in-out"
    }
}

const Header = (props) => {
    const { classes, isAdmin, onAction } = props;
    const [open, showNavbar] = useState(false);

    const adminMenu = () => {
        return ( 
            <>
                <li>
                    <a 
                    onClick={() => {
                        showNavbar(false);
                        onAction("schedule");
                    }}>
                    HORARIO
                    </a>
                </li> 
                <li>
                    <a 
                    onClick={() => {
                        showNavbar(false);
                        onAction("bookings");
                    }}>
                    TURNOS
                    </a>
                </li> 
                <li><a onClick={() => onAction("logout")}>SALIR</a></li>
            </>
        );
    }

    const userMenu = () => {
        return (
            <>
                <li>
                    <a 
                    onClick={() => {
                        showNavbar(false);
                        onAction("bookings");
                    }}>
                    TURNOS
                    </a>
                </li>                
                <li>
                    <a 
                    onClick={() => {
                        showNavbar(false);
                        onAction("profile");
                    }}>
                    PERFIL
                    </a>
                </li>
                <li><a onClick={() => onAction("logout")}>SALIR</a></li>
            </>
        );
    }
    
    return (
        <header className={classes.header +' '+ (open ? classes.open : '')}>
            <div className={classes.barContainer}>
                <BurgerButton onChange={ clicked => showNavbar(clicked) } isOpen={open} ></BurgerButton>
                <div className={classes.logo +' '+ (open ? classes.logoHidden : '' )}>
                    <span></span>
                </div>
            </div>
            <nav className={classes.navbar +' '+ (open ? '' : classes.navbarHidden )}>
                <ul className={classes.linksList +' '+ (open ? classes.linksListVisible : '' )}>
                    { isAdmin ? adminMenu() : userMenu() }
                </ul> 
            </nav>
            <div className={classes.logoBlack +' '+ (open ?  classes.logoBlackVisible  :  classes.logoBlackHidden) }>
                <span></span>
            </div>
        </header>
        
    );
}

export default withStyles(styles)(Header);