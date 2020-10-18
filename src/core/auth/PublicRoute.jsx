import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, selectUser } from "/context";

export const PublicRoute = ({
  component: Component,
  adminRequired,
  redirectPath = "/",
  ...rest
}) => {
  const user = useSelector(selectUser);
  const userLogged = user.id !== "";

  console.log(adminRequired);
  const showRoute = () => {
    if (userLogged) {
      // if (adminRequired) {
      //   if (user.isAdmin) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      return false;
      // } else if (user.isAdmin) {
      //   return false;
      // }
    }
    return true;
  };

  return (
    <Route
      {...rest}
      render={({ location }) =>
        showRoute() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
