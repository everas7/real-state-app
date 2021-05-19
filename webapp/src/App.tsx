import React, { useState, useEffect } from 'react';
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
import { AuthorizedRoute } from './app/routes/AuthorizedRoute';
import { NotFound } from './app/components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './app/store/hooks';
import {
  selectAuthenticatedUser,
  selectIsAuthenticated,
  setCurrentUser,
} from './features/access/services/accessSlice';
import { Container, Row, Spinner } from 'react-bootstrap';
import { Navbar } from './app/components';
import { Permissions } from './app/authorization/permissions';

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
    if (user || !token) {
      setLoadingApp(false);
    }
  }, [dispatch, user, isAuthenticated]);

  if (loadingApp)
    return (
      <div className="full-screen-spinner">
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
          variant="primary"
        />
        <span className="sr-only">Loading app...</span>{' '}
      </div>
    );

  function renderAccessPage() {
    return !isAuthenticated ? <AccessPage /> : <Redirect to="/" />;
  }

  function renderRoutes() {
    return (
      <Switch>
        {/* Without Main Layout */}
        <AuthorizedRoute
          path={['/', '/apartments']}
          isLoggedIn={isAuthenticated}
          component={PropertyListPage}
          user={user!}
          rolesAllowed={Permissions.Properties.List.PageAccess}
          exact={true}
        />
        {/* With Main Layout */}
        <Route>
          <Container className="d-flex flex-column vh-100 overflow-hidden">
            <Row className="flex-shrink-0">{isAuthenticated && <Navbar />}</Row>
            <Row className="flex-grow-1 overflow-hidden">
              <Switch>
                <AuthorizedRoute
                  path={['/apartments/create']}
                  isLoggedIn={isAuthenticated}
                  component={PropertyCreatePage}
                  user={user!}
                  rolesAllowed={Permissions.Properties.Create.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/apartments/:id']}
                  user={user!}
                  isLoggedIn={isAuthenticated}
                  component={PropertyDetailPage}
                  rolesAllowed={Permissions.Properties.Detail.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/apartments/:id/edit']}
                  isLoggedIn={isAuthenticated}
                  component={PropertyEditPage}
                  user={user!}
                  rolesAllowed={Permissions.Properties.Edit.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/users']}
                  isLoggedIn={isAuthenticated}
                  component={UserListPage}
                  user={user!}
                  rolesAllowed={Permissions.Users.List.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/users/create']}
                  isLoggedIn={isAuthenticated}
                  component={UserFormPage}
                  user={user!}
                  rolesAllowed={Permissions.Users.Create.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/users/:id']}
                  isLoggedIn={isAuthenticated}
                  component={UserDetailPage}
                  user={user!}
                  rolesAllowed={Permissions.Users.Detail.PageAccess}
                  exact={true}
                />
                <AuthorizedRoute
                  path={['/users/:id/edit']}
                  isLoggedIn={isAuthenticated}
                  component={UserFormPage}
                  user={user!}
                  rolesAllowed={Permissions.Users.Edit.PageAccess}
                  exact={true}
                />
                <Route path="/(.+)" component={NotFound} />
              </Switch>
            </Row>
          </Container>
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/access" component={renderAccessPage} exact={true} />
      <Route path="/*" render={renderRoutes} />
    </Switch>
  );
}
