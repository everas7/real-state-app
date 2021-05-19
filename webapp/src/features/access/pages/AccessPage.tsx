import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import styles from './AccessPage.module.scss';

export default function AccessPage() {
  const [login, setLogin] = useState(true);

  function handleSwitch() {
    setLogin(!login);
  }

  return (
    <div className={styles['access-page']}>
      <div className={styles['access-page__image']} />

      <div className={styles['access-page__page']}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md="6">
              {login ? (
                <Login onSwitch={handleSwitch} />
              ) : (
                <Signup onSwitch={handleSwitch} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
