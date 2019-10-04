import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    mainContainer: {
      width: "100%",
      position: "relative",
      top: 0,
      left: 0,
    },
    imagesContainer: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        transition: "1s ease-in-out"
    },
    image: {
        width: "100vw",
        position: "relative",
        left: 0,
        top: 0
    }
}

export const ImageSlider = (props) => {
    const { classes, images } = props;
    
    const calculateWidth = () => {
        return `${images.length * 100}%`;
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.imagesContainer} style={ { width: calculateWidth() } }>
            { 
                images.map( (image, index) => {
                    return <img className={classes.image} style={ {} } key={index} src={image} />
                })
            }
            </div>
        </div>
    );
}

export default withStyles(styles)(ImageSlider);