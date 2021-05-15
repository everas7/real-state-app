import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AccessPage } from './features/access';
import { PropertyListPage, PropertyDetailPage, PropertyEditPage } from './features/properties';
import * as authHelper from './app/helpers/authHelper';
import { PrivateRoute } from './app/routes/PrivateRoute';
import { NotFound } from './app/components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './app/store/hooks';
import {
  selectIsAuthenticated,
  setAuthenticated,
} from './features/access/services/accessSlice';
import { Container, Row } from 'react-bootstrap';
import {Navbar} from './app/components';

export default function Routes() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const token = authHelper.getToken();
    console.log('EFF')
    if (token) {
      dispatch(setAuthenticated(true));
    }
    setLoadingApp(false);
  }, [dispatch]);

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
            <Container className="d-flex flex-column vh-100 overflow-hidden">
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
                  <PrivateRoute
                    path={['/apartments/:id']}
                    isLoggedIn={isAuthenticated}
                    component={PropertyDetailPage}
                    exact
                  />
                  <PrivateRoute
                    path={['/apartments/:id/edit']}
                    isLoggedIn={isAuthenticated}
                    component={PropertyEditPage}
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
