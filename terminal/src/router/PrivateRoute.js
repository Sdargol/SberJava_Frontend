import React from "react";
import { Route, Redirect} from "react-router-dom";

export function PrivateRoute({token, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }