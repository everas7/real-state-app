import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { selectAuthenticatedUser } from '../../../features/access/services/accessSlice';
import { useAppSelector } from '../../store/hooks';

import styles from './Navbar.module.scss';

export function Navbar() {
  const user = useAppSelector(selectAuthenticatedUser);

  return (
    <BootstrapNavbar className={styles.navbar}>
      <BootstrapNavbar.Brand className={styles.navbar__brand}>
        Real State
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className="justify-content-end">
        <BootstrapNavbar.Text>
          Signed in as: <a href="#login">{user?.name}</a>
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
