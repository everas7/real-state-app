import React from 'react';
import {
  RouteProps,
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { NotFound } from '../components';
import { Role } from '../models/role';
import { User } from '../models/user';


export const AuthorizedRoute: React.FC<any> = ({
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
