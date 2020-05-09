import React, { useRef, useEffect, useState } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, useTransition, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { withStyles } from '@material-ui/styles'

const styles = {
    container: {
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative",
        "& div": {
            display: "block",
            position: "absolute",
            willChange: "transform",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
        }   
    }
}

const ImageSlideGalery = (props) => {
    const { classes, images } = props;
    const _images = [];
    images.map( (image, index) => {
        _images.push({id: index, url: image.url });
    })
    const [index, set] = useState(0);
    const transitions = useTransition(_images[index], item => item.id, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
    })
    useEffect(() => {
         setInterval(() => set(state => {
            if(state === _images.length-1) return 0;
            return ( state + 1);
        }), 4000);
    },[]);

    return (
        <div className={classes.container}>
        { 
        transitions.map(({ item, props, key }) => (
            <animated.div
                key={key}
                style={{ ...props, backgroundImage: `url(${item.url}` }}
            />
            ))
        }
        </div>
    );  
  }
  

export default withStyles(styles)(ImageSlideGalery);
