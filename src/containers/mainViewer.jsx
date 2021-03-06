import React, { useEffect } from "react";
import { useStateValue } from "../context/context";
import * as appActions from "../actions/app";
import Header from "../components/header";
import ReactPageScroller from "react-page-scroller";
import { withStyles } from "@material-ui/styles";
import BookingList from "./bookingList";
import BookingHandler from "./bookingHandler";
import UserProfile from "./userProfile";
import GalerySection from "../components/galerySection";
import { useSelector, selectAuth, selectUser } from "/context";
import { useHistory } from "react-router-dom";

const styles = {
  container: {
    padding: "5px",
    "& > div": {
      width: "100% !important",
      "& div": {
        outline: "none",
      },
    },
  },
};

export const MainViewer = (props) => {
  const { classes } = props;
  const [state, dispatch] = useStateValue();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const history = useHistory();
  const {
    scrollDownDisabled,
    scrollUpDisabled,
    showBookingSection,
    showUserProfileSection,
    currentPage,
  } = state;
  let pageScroller = null;

  const pageOnChange = (scroll) => {
    goToPage(scroll - 1);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      dispatch(appActions.changePage(pageNumber));
    }
  };

  const setScrollHandler = (scroll) => {
    if (scroll) {
      pageScroller = scroll;
    }
  };

  const disableScroll = (disable) => {
    dispatch(appActions.disableScrollUp(disable));
    dispatch(appActions.disableScrollDown(disable));
  };

  const changePageAndHideSection = () => {
    dispatch(appActions.changePage(1));
    // set a delay to not hide section so quickly
    setTimeout(() => dispatch(appActions.showBookingHandlerView(false)), 1000);
  };

  const actionHeaderHandler = async (action) => {
    switch (action) {
      case "logout":
        await auth.logout(user);
        dispatch(appActions.reset());
        history.push("/login");
        break;
      case "profile":
        dispatch(appActions.changePage(2));
        dispatch(appActions.showUserProfileView(true));
        break;
      case "bookingHandler":
        dispatch(appActions.changePage(2));
        dispatch(appActions.showBookingHandlerView(true));
        break;
      case "bookings":
        dispatch(appActions.changePage(1));
        break;
    }
  };

  useEffect(() => {
    pageScroller.goToPage(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Header onAction={actionHeaderHandler}></Header>
      <div className={classes.container}>
        <ReactPageScroller
          ref={setScrollHandler}
          pageOnChange={pageOnChange}
          blockScrollDown={scrollDownDisabled}
          blockScrollUp={scrollUpDisabled}
        >
          <GalerySection />
          <BookingList onAction={actionHeaderHandler}></BookingList>
          {showBookingSection || showUserProfileSection ? (
            <>
              {showBookingSection && (
                <BookingHandler
                  onDisableScroll={disableScroll}
                  onGoUp={changePageAndHideSection}
                />
              )}
              {showUserProfileSection && <UserProfile />}
            </>
          ) : null}
        </ReactPageScroller>
      </div>
    </div>
  );
};

export default withStyles(styles)(MainViewer);
