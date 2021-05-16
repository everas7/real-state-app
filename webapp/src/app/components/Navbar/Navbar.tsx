import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import {
  logout,
  selectAuthenticatedUser,
} from '../../../features/access/services/accessSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Navbar.module.scss';

export function Navbar() {
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();

  return (
    <BootstrapNavbar className={styles.navbar}>
      <BootstrapNavbar.Brand className={styles.navbar__brand}>
        Real State
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className="justify-content-end">
        <BootstrapNavbar.Text>
          Signed in as: <a href="">{`${user?.name} `}</a>
        </BootstrapNavbar.Text>
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
