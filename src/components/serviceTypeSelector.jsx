import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100%", 
        backgroundColor: "#000",
        display: "flex",
        paddingTop: "100px",
        justifyContent: "center",
        color: "#FFF",
        "& div": {
       
            "& button": {
                height: "100%",
                width: "100%",
                border: "2px solid #2e2e2e",
                cursor: "pointer",
                letterSpacing: "0.2125rem",
                overflow: "hidden",
                margin: "5px",
                color: "#FFF",
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
                    borderColor: "#FFF",
                    boxShadow: "0 0 5px rgba(255, 245, 245, 0.8)",
                }
            },
        }
    },
    option1: {
        width: "100%",
        height: "200px"
    },
    option2: {
        width: "50%",
        height: "150px",
        marginRight: "5px"
    },
    option3: {
        width: "50%",
        height: "150px"
    },
    servicesContainer: {
        width: "400px",
    },
    secondButtonsRow: {
        display: "flex",
        marginTop: "5px"
    }
}

export const ServiceTypeSelector = (props) => {
    const { classes, serviceSelected } = props; 

    return (
        <div className={classes.container}>
            <div className={classes.servicesContainer}>
                <div className={classes.option1}>
                    <button onClick={() => serviceSelected({ name: 'classic', duration: 30})}>
                        CLASSIC
                    </button>    
                </div>
                <div className={classes.secondButtonsRow}>
                    <div className={classes.option2}>
                        <button onClick={() => serviceSelected({ name: 'complete', duration: 60})}>
                            COMPLETE
                        </button>    
                    </div>
                    <div className={classes.option3}>
                        <button onClick={() => serviceSelected({ name: 'custom', duration: 120})}>
                            CUSTOM
                        </button>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(ServiceTypeSelector);


