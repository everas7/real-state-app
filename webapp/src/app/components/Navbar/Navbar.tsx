import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  logout,
  selectAuthenticatedUser,
} from '../../../features/access/services/accessSlice';
import { AuthorizedComponent } from '../../hoc/AuthorizedComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Navbar.module.scss';

export function Navbar() {
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();

  return (
    <BootstrapNavbar className={styles.navbar}>
      <BootstrapNavbar.Brand className={styles.navbar__brand} as={Link} to="/">
        Real State
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Apartments
        </Nav.Link>
        <AuthorizedComponent rolesAllowed={['ADMIN']}>
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
        </AuthorizedComponent>
      </Nav>
      <BootstrapNavbar.Collapse className="justify-content-end">
        <BootstrapNavbar.Text>{`${user?.name} `}</BootstrapNavbar.Text>
        <BootstrapNavbar.Text
          className={styles.navbar__logout}
          onClick={() => dispatch(logout())}
        >
          Logout
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
