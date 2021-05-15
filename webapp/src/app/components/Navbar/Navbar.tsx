import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

import styles from './Navbar.module.scss';

export function Navbar() {
  return (
    <BootstrapNavbar className={styles.navbar}>
      <BootstrapNavbar.Brand className={styles.navbar__brand}>
        Real State
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className="justify-content-end">
        <BootstrapNavbar.Text>
          Signed in as: <a href="#login">John Doe</a>
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
