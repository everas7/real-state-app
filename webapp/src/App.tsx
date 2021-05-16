import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AccessPage } from './features/access';
import {
  PropertyListPage,
  PropertyDetailPage,
  PropertyEditPage,
  PropertyCreatePage,
} from './features/properties';
import { UserListPage, UserDetailPage, UserFormPage } from './features/users';
import * as authHelper from './app/helpers/authHelper';
import { PrivateRoute } from './app/routes/PrivateRoute';
import { AuthorizedRoute } from './app/routes/AuthorizedRoute';
import { NotFound } from './app/components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './app/store/hooks';
import {
  selectAuthenticatedUser,
  selectIsAuthenticated,
  setAuthenticated,
  setCurrentUser,
} from './features/access/services/accessSlice';
import { Container, Row } from 'react-bootstrap';
import { Navbar } from './app/components';

export default function Routes() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthenticatedUser);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const token = authHelper.getToken();
    if (token && !isAuthenticated) {
      dispatch(setCurrentUser());
    }
    if (user) {
      setLoadingApp(false);
    }
    if (!token) {
      setLoadingApp(false);
    }
  }, [dispatch, user, isAuthenticated]);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
  }, []);

  if (loadingApp) return <div>Loading app, please wait...</div>;

  function renderAccessPage() {
    return !isAuthenticated ? <AccessPage /> : <Redirect to="/" />;
  }

  function renderRoutes() {
    return (
      <Container className="d-flex flex-column vh-100 overflow-hidden">
        <Row className="flex-shrink-0">{isAuthenticated && <Navbar />}</Row>
        <Row className="flex-grow-1 overflow-hidden">
          <Switch>
            <PrivateRoute
              path={['/', '/apartments']}
              isLoggedIn={isAuthenticated}
              component={PropertyListPage}
              exact={true}
            />
            <AuthorizedRoute
              path={['/apartments/create']}
              isLoggedIn={isAuthenticated}
              component={PropertyCreatePage}
              user={user!}
              rolesAllowed={['REALTOR', 'ADMIN']}
              exact={true}
            />
            <PrivateRoute
              path={['/apartments/:id']}
              isLoggedIn={isAuthenticated}
              component={PropertyDetailPage}
              exact={true}
            />
            <AuthorizedRoute
              path={['/apartments/:id/edit']}
              isLoggedIn={isAuthenticated}
              component={PropertyEditPage}
              user={user!}
              rolesAllowed={['REALTOR', 'ADMIN']}
              exact={true}
            />
            <AuthorizedRoute
              path={['/users']}
              isLoggedIn={isAuthenticated}
              component={UserListPage}
              user={user!}
              rolesAllowed={['ADMIN']}
              exact={true}
            />
            <AuthorizedRoute
              path={['/users/create']}
              isLoggedIn={isAuthenticated}
              component={UserFormPage}
              user={user!}
              rolesAllowed={['ADMIN']}
              exact={true}
            />
            <AuthorizedRoute
              path={['/users/:id']}
              isLoggedIn={isAuthenticated}
              component={UserDetailPage}
              user={user!}
              rolesAllowed={['ADMIN']}
              exact={true}
            />
            <AuthorizedRoute
              path={['/users/:id/edit']}
              isLoggedIn={isAuthenticated}
              component={UserFormPage}
              user={user!}
              rolesAllowed={['ADMIN']}
              exact={true}
            />

            <Route path="/(.+)" component={NotFound} />
          </Switch>
        </Row>
      </Container>
    );
  }

  return (
    <Switch>
      <Route path="/access" component={renderAccessPage} exact={true} />
      <Route path="/*" render={renderRoutes} />
    </Switch>
  );
}
