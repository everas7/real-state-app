import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import { AccessPage } from '../features/access';
import { PropertyListPage } from '../features/properties';
import * as authHelper from '../helpers/authHelper';
import { PrivateRoute } from './PrivateRoute';
import { NotFound } from '../components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectIsAuthenticated,
  setAuthenticated,
} from '../features/access/services/accessSlice';

export default function Routes() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const token = authHelper.getToken();
    if (token) {
      dispatch(setAuthenticated(true));
    }
    setLoadingApp(false);
  }, []);

  if (loadingApp) return <div>Loading app, please wait...</div>;
  return (
    <Switch>
      <PrivateRoute
        path={['/', '/apartments']}
        isLoggedIn={isAuthenticated}
        component={PropertyListPage}
        exact
      />
      <Route
        path="/access"
        component={() =>
          !isAuthenticated ? <AccessPage /> : <Redirect to="/" />
        }
        exact
      />
      <Route path="/(.+)" component={NotFound} />
    </Switch>
  );
}
