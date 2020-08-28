import React from "react";
import { withStyles } from "@material-ui/styles";
import { colorScheme } from "../styles/styles";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    backgroundColor: colorScheme.disabledOptions,
    color: "#000",
    borderRadius: "30px",
    fontFamily: "'Abril Fatface', cursive",
    transition: "all 1s ease-in-out",
    cursor: "pointer",
  },
  on: {
    backgroundColor: "#FFF",
    width: "50px",
    height: "50px",
  },
};

export const CicularNumberIndicator = (props) => {
  const { classes, number, on, clicked } = props;

  return (
    <div
      className={classes.container + " " + (on ? classes.on : "")}
      onClick={() => clicked(number)}
    >
      <p>{number}</p>
    </div>
  );
};

export default withStyles(styles)(CicularNumberIndicator);
