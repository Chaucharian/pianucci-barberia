import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, selectUser } from "/context";

export const PrivateRoute = ({ component: Component, admin, ...rest }) => {
  const user = useSelector(selectUser);

  console.log(admin);
  const showRoute = () => {
    if (admin && user.isAdmin) return true;
    if (user.id !== "") return true;
    return false;
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
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
