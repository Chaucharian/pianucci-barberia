import React, { useEffect, useLayoutEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import Header from '../components/header';
import ReactPageScroller from "react-page-scroller";
import { withStyles } from '@material-ui/styles';
import corte1 from '../assets/corte1.jpg';
import corte2 from '../assets/corte2.jpg';
import corte3 from '../assets/corte3.jpg';
import ImageSlideGalery from '../components/imageSlideGalery';
import BookingList from './bookingList';
import BookingHandler from './bookingHandler';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100vh"
    },
    headerSpace: {
        height: "76px"
    },
    buttonContainer: {
        position: "fixed",
        top: "75%",
        left: "45%"
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
            paddingTop: "10px"
        }
    }
}

export const MainViewer = (props) => {
    const { classes } = props; 
    const [state, dispatch] = useStateValue();
    const { scrollDownDisabled, scrollUpDisabled, showBookingSection, currentPage } = state;
    let pageScroller = null;

    const pageOnChange = scroll => {
        goToPage(scroll);
    }

    const goToPage = pageNumber => {
        if(pageNumber !== currentPage) {
            dispatch( appActions.changePage(pageNumber) );
        }
    }

    const setScrollHandler = scroll => {
        if(scroll) {
            pageScroller = scroll;
        }
    }

    const disableScroll = disable => {
        dispatch(appActions.disableScrollUp(disable));
        dispatch(appActions.disableScrollDown(disable));
    }

    const changePageAndHideSection = () => {
        goToPage(1);
        setTimeout( () => {
            dispatch(appActions.showBookingHandlerView(false));
            dispatch(appActions.disableScrollDown(true));
        }, 1000);
    }

    const actionHeaderHandler = action => {
        if(action === "logout") {
            dispatch(appActions.logoutUser(true));
        }
    }

    useEffect(() => {
        pageScroller.goToPage(currentPage);
        if(currentPage === 2) {
            if(!showBookingSection) {
                dispatch(appActions.disableScrollDown(true));
            } else {
                dispatch(appActions.disableScrollDown(false));
            }
        } else if(currentPage === 1) {
            dispatch(appActions.disableScrollDown(false));
        }
    }, [currentPage]);

    useEffect(()=> {
        if(showBookingSection) {
            goToPage(2);
        }
    }, [showBookingSection]);

    return (
        <div>
            <Header onAction={actionHeaderHandler}></Header>
            <div className={classes.content}>
                <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange} blockScrollDown={scrollDownDisabled} blockScrollUp={scrollUpDisabled} >
                    <div>
                        <ImageSlideGalery images={[corte1,corte2,corte3]}></ImageSlideGalery>
                        <div className={classes.buttonContainer}>
                            <button className={classes.nextPageButton} onClick={() => goToPage(1)}>
                                <i className="fas fa-arrow-circle-down"></i>
                            </button>
                        </div>
                    </div>
                    <BookingList></BookingList>
                    {
                        showBookingSection && <BookingHandler onDisableScroll={disableScroll} onGoUp={changePageAndHideSection}></BookingHandler>
                    }
                </ReactPageScroller>
            </div>
        </div>
    );
}

export default withStyles(styles)(MainViewer);


