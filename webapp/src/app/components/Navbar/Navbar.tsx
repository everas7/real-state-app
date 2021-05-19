import React from 'react';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Col,
  Row,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  logout,
  selectAuthenticatedUser,
} from '../../../features/access/services/accessSlice';
import { AuthorizedComponent } from '../../authorization/AuthorizedComponent';
import { Permissions } from '../../authorization/permissions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Navbar.module.scss';

export function Navbar() {
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();

  return (
    <Col>
      <BootstrapNavbar
        className={styles.navbar}
        collapseOnSelect={true}
        expand="md"
      >
        <BootstrapNavbar.Brand
          className={styles.navbar__brand}
          as={Link}
          to="/"
        >
          Real State
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Apartments
            </Nav.Link>
            <AuthorizedComponent
              rolesAllowed={Permissions.Users.List.PageAccess}
            >
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </AuthorizedComponent>
          </Nav>
          <Nav className="flex-row">
            <NavDropdown title={`${user?.name} `} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile/settings">
                Settings
              </NavDropdown.Item>
            </NavDropdown>
            <BootstrapNavbar.Text
              className={styles.navbar__logout}
              onClick={() => dispatch(logout())}
            >
              Logout
            </BootstrapNavbar.Text>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </Col>
  );
}
