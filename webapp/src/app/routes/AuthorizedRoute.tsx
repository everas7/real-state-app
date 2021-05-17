import React from 'react';
import {
  RouteProps,
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { NotFound } from '../components';
import { User } from '../models/user';

interface IProps extends RouteProps {
  isLoggedIn: boolean;
  component: React.ComponentType<RouteComponentProps<any>>;
  rolesAllowed?: string[];
  user: User;
}

export const AuthorizedRoute: React.FC<IProps> = ({
  component: Component,
  isLoggedIn,
  rolesAllowed,
  user,
  ...rest
}) => {
  let isAllowed = isLoggedIn;

  if (!isAllowed) {
    return <Route {...rest} render={() => <Redirect to="/access" />} />;
  } else if (rolesAllowed) {
    isAllowed = isAllowed && rolesAllowed.includes(user.role);
    if (!isAllowed) {
      return <Route {...rest} render={() => <NotFound />} />;
    }
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};
