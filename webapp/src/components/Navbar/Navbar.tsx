import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

import './Navbar.scss';

export default function Navbar() {
  return (
    <BootstrapNavbar>
      <BootstrapNavbar.Brand>
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
