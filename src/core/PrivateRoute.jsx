import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, selectUser } from "/context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.id !== "" ? (
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
