import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Col } from 'react-bootstrap';

export function NotFound() {
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <Container>
        <Row md="12" className="justify-content-center">
          <Col md="12" className="text-center">
            <span className="display-1 d-block">404</span>

            <div className="mb-4 lead">
              Oops - we've looked everywhere but couldn't find this.
            </div>
            <Button as={Link} to="/">
              Browse Properties
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
