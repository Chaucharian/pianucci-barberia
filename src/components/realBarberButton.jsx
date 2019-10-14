import React from 'react';
import { withStyles} from '@material-ui/styles';

const styles = {
    button: {
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
                    backgroundColor: "#d00909",
                    transform: "translate3d(150%, -100px, 0) rotate3d(0, 0, 1, 90deg)"
                },
                "& .mask2": {
                    backgroundColor: "#FFF",
                    transform: "translate3d(130%, -100px, 0) rotate3d(0, 0, 1, 90deg)"
                },
                "& .mask3": {
                    backgroundColor: "#012ea1",
                    transform: "translate3d(115%, -100px, 0) rotate3d(0, 0, 1, 90deg)"
                }
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
        </div>
    </button>);
};

export default withStyles(styles)(RealBarberButton);