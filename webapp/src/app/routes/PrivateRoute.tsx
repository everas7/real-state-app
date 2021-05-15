import React from 'react';
import {
  RouteProps,
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

interface IProps extends RouteProps {
  isLoggedIn: boolean;
  component: React.ComponentType<RouteComponentProps<any>>;
}

export const PrivateRoute: React.FC<IProps> = ({
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
