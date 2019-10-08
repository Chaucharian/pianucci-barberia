import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { useGestureResponder } from "react-gesture-responder";


const styles = {
    mainContainer: {
      width: "100%",
    },
    imagesContainer: {
        position: "relative",
        left: "0%",
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        transition: "1s all ease-in-out"
    },
    image: {
        width: "100vw",
    }
}

export const ImageSlider = (props) => {
    const { classes, images } = props;
    const [state, changeState] = useState({ touched: false,  lastXPosition: 0 });
    
    const calculateWidth = () => {
        return `${images.length * 100}%`;
    }

    // const { bind } = useGestureResponder({
    //     onStartShouldSet: () => true,
    //     onRelease: ()=> {},
    //     onTerminate: () => {},
    //     onMove: ({ delta }) => {
    //       console.log(delta);
    //     }
    //   });
      
    //   bind.onTouchMove(data => console.log(data));
    // console.log(bind)
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