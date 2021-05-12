import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AccessPage } from './features/access';
import { PropertyListPage } from './features/properties';
import * as authHelper from './helpers/authHelper';
import { PrivateRoute } from './routes/PrivateRoute';
import { NotFound } from './components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  selectIsAuthenticated,
  setAuthenticated,
} from './features/access/services/accessSlice';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from './components/Navbar/Navbar';

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

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
  }, []);

  if (loadingApp) return <div>Loading app, please wait...</div>;
  return (
    <Switch>
      <Route
        path="/access"
        component={() =>
          !isAuthenticated ? <AccessPage /> : <Redirect to="/" />
        }
        exact
      />
      <Route
        path="/*"
        render={() => (
          <>
            <Container className="h-100 d-flex flex-column">
              <Row className="flex-shrink-0">
                <Navbar />
              </Row>
              <Row className="flex-grow-1 overflow-hidden">
                <Switch>
                  <PrivateRoute
                    path={['/', '/apartments']}
                    isLoggedIn={isAuthenticated}
                    component={PropertyListPage}
                    exact
                  />
                  <Route path="/(.+)" component={NotFound} />
                </Switch>
              </Row>
            </Container>
          </>
        )}
      />
    </Switch>
  );
}
