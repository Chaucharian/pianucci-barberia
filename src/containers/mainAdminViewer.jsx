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
import BookingAdminList from './bookingAdminList';

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

export const MainAdminViewer = (props) => {
    const { classes } = props; 
    const [state, dispatch] = useStateValue();
    const { user, scrollDownDisabled, scrollUpDisabled, showBookingSection, showUserProfileSection, currentPage } = state;
    let pageScroller = null;

    const pageOnChange = scroll => {
        goToPage(scroll -1);
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
        dispatch(appActions.changePage(1));
        dispatch(appActions.showBookingHandlerView(false));
    }

    const actionHeaderHandler = action => {
        if(action === "logout") {
            dispatch(appActions.logoutUser(true));
        } else if(action === "profile") {
            dispatch(appActions.changePage(2));
            dispatch(appActions.showUserProfileView(true));
        } else if(action === "bookingHandler") {
            dispatch(appActions.changePage(2));
            dispatch(appActions.showBookingHandlerView(true));
        }
    }

    useEffect(() => {
        pageScroller.goToPage(currentPage);
    }, [currentPage]);

    return (
        <div>
            <Header onAction={actionHeaderHandler} isAdmin={true} ></Header>
            <div className={classes.content}>
                <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange} blockScrollDown={scrollDownDisabled} blockScrollUp={scrollUpDisabled} >
                    <div></div>
                    <BookingAdminList onAction={actionHeaderHandler} />
                </ReactPageScroller>
            </div>
        </div>
    );
}

export default withStyles(styles)(MainAdminViewer);


