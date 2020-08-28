import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { useStateValue } from "../state/rootState";
import * as appActions from "../actions/app";
import * as api from "../services/api";
import ImageSlideGalery from "./imageSlideGalery";
import Spinner from "./spinner";

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#000",
    textAlign: "center",
    color: "#FFF",
    "& h2": {
      fontWeight: "lighter",
    },
  },
  buttonContainer: {
    position: "fixed",
    top: "75%",
    left: "45%",
  },
  nextPageButton: {
    color: "#FFF",
    fontSize: "40px",
    border: "none",
    outline: "0px",
    background: "transparent",
    transition: "1s all ease-in-out",

    "&:hover": {
      color: "#000",
      paddingTop: "10px",
    },
  },
};

export const GalerySection = ({ classes }) => {
  const [{ fetching }, dispatch] = useStateValue();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(appActions.fetching(true));
    api.getImageGalery().then(({ images }) => {
      dispatch(appActions.fetching(false));
      setImages(images);
    });
  }, []);

  return (
    <div className={classes.container}>
      <Spinner loading={fetching}>
        <>
          {images.length !== 0 && (
            <ImageSlideGalery images={images}></ImageSlideGalery>
          )}
          <div className={classes.buttonContainer}>
            <button
              className={classes.nextPageButton}
              onClick={() => dispatch(appActions.changePage(1))}
            >
              <i className="fas fa-arrow-circle-down"></i>
            </button>
          </div>
        </>
      </Spinner>
    </div>
  );
};

export default withStyles(styles)(GalerySection);
