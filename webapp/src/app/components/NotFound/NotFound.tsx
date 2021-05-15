import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';

export function NotFound() {
  return (
    <Container>
      <Row md="12">
        Oops - we've looked everywhere but couldn't find this.
        <Container>
          <Row md="4">
            <Button as={Link} to="/">
              Browse Properties
            </Button>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
