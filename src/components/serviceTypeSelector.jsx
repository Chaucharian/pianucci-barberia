import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    paddingTop: "30px",
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
        color: "#FFF",
        padding: "20px 30px",
        position: "relative",
        backgroundColor: "#000",
        textAlign: "center",
        textTransform: "uppercase",
        outline: "0px",
        transition:
          "background 5s cubic-bezier(0.19, 1, 0.22, 1)," +
          "border 1s cubic-bezier(0.19, 1, 0.22, 1)," +
          "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        "&:hover": {
          borderColor: "#FFF",
          boxShadow: "0 0 5px rgba(255, 245, 245, 0.8)",
        },
      },
    },
  },
  option: {
    marginBottom: "10px",
    width: "100%",
    height: "150px",
  },
  servicesContainer: {
    width: "400px",
    margin: "5px",
    "& p": {
      fontFamily: "Raleway, sans-serif",
      fontSize: "20px",
    },
  },
  secondButtonsRow: {
    display: "flex",
    marginTop: "5px",
  },
  time: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      fontSize: "20px",
    },
  },
};

export const ServiceTypeSelector = (props) => {
  const { classes, onServiceSelected } = props;

  return (
    <div className={classes.container}>
      <div className={classes.servicesContainer}>
        <div className={classes.option}>
          <button
            onClick={() => onServiceSelected({ name: "Classic", duration: 60 })}
          >
            <p>CLASSIC</p>
            <div className={classes.time}>
              60<i className="far fa-clock"></i>
            </div>
          </button>
        </div>
        <div className={classes.option}>
          <button
            onClick={() =>
              onServiceSelected({
                name: "VIP",
                duration: "Sin limite de tiempo",
              })
            }
          >
            <p>V.I.P</p>
            <div className={classes.time}>
              sin limite<i className="far fa-clock"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ServiceTypeSelector);
