import React from 'react';
import {
  RouteProps,
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';


export const PrivateRoute: React.FC<any> = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/access" />
      }
    />
  );
};
