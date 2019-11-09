import React from 'react';
import { withStyles} from '@material-ui/styles';
import { colorScheme } from '../styles/styles';

const styles = {
    button: {
        maxWidth: "360px",
        width: "100%",
        border: "2px solid #2e2e2e",
        cursor: "pointer",
        letterSpacing: "0.2125rem",
        overflow: "hidden",
        margin: "5px",
        padding: "20px 30px",
        position: "relative",
        backgroundColor: "#000",
        textAlign: "center",
        textTransform: "uppercase",
        outline: "0px",
        transition: "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
            "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
            "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        "&:hover": {
            // backgroundColor: "rgba(39, 35, 35, 0.92)",
            borderColor: "#FFF",
            boxShadow: "0 0 5px rgba(255, 245, 245, 0.8)",
            transition: "background 0s",
            "& div": {
                "& a": {
                    color: "#FFF"
                },
                "& i": {
                    paddingLeft: "5px"
                },
                "& .mask1": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(150%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 18
                },
                "& .mask2": {
                    backgroundColor: colorScheme.blueBarberPost,
                    transform: "translate3d(145%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 17
                },
                "& .mask3": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(140%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 16
                },
                "& .mask4": {
                    backgroundColor: colorScheme.redBarberPost,
                    transform: "translate3d(135%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 15
                },
                "& .mask5": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(130%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 14
                },
                "& .mask6": {
                    backgroundColor: colorScheme.blueBarberPost,
                    transform: "translate3d(125%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 13
                },
                "& .mask7": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(120%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 12
                },
                "& .mask8": {
                    backgroundColor: colorScheme.redBarberPost,
                    transform: "translate3d(115%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 11
                },
                "& .mask9": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(110%, -85px, 0) rotate3d(0, 0, 1, 110deg)",
                    zIndex: 10
                },
            }
        },
         
        "& div": {
            "& a": {
                color: "#969696",
                fontFamily: "Varela Round",
                fontSize: "14px",
                textDecoration: "none"
            },
            "& i": {
                paddingLeft: "2px",
                transition: ".5s ease-in-out",
                color: "#FFF",
                fontSize: "18px"
            },
            "& .mask1": {
                backgroundColor: "#d00909",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask2": {
                backgroundColor: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask3": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask4": {
                backgroundColor: "#d00909",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask5": {
                backgroundColor: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask6": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask7": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask8": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            },
            "& .mask9": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                height: "100px",
                position: "absolute",
                transform: "translate3d(-120%, -50px, 0) rotate3d(0, 0, 1, 45deg)",
                transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
                width: "200px"
            }
        }
    },
    boldFont: {
        fontWeight: "bold"
    }    
}

const RealBarberButton = (props) => {
    const { classes, text, icon, clicked } = props;
    return (
    <button className={classes.button +' '+ (props.strong ? classes.boldFont : '' )} onClick={ () => clicked(true)}>
        <div>
            <a>{ text }</a>
            { icon }
            <div className="mask1"></div>
            <div className="mask2"></div>
            <div className="mask3"></div>
            <div className="mask4"></div>
            <div className="mask5"></div>
            <div className="mask6"></div>
            <div className="mask7"></div>
            <div className="mask8"></div>
            <div className="mask9"></div>
        </div>
    </button>);
};

export default withStyles(styles)(RealBarberButton);