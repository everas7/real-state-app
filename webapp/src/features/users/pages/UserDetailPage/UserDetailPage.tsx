import React, { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import UserDetails from '../../components/UserDetails/UserDetails';
import { Breadcrumb, Map, Button, NotFound } from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { Users } from '../../../../app/services/usersApi';
import styles from './UserDetailPage.module.scss';
import { history } from '../../../../index';
import { AuthorizedComponent } from '../../../../app/hoc/AuthorizedComponent';

export default function UserDetailPage(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Users.get(parseInt(id, 10))
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        if (err.status === 404) {
          setError('Not Found');
        }
      });
  }, [id]);

  function handleDelete() {
    Users.delete(+id).then(() => {
      handleClose();
      history.push('/users');
    });
  }
  if (error === 'Not Found') return <NotFound />;
  if (!user) return <div>Loading User...</div>;
  return (
    <>
      <Breadcrumb items={[{ name: 'Users', path: '/users' }, { name: id }]} />
      <Col className={cx(styles['user-detail-page__content'])}>
        <Row className={cx('')}>
          <Col md="12">
            <div className={styles['user-detail-page__controls']}>
              <Button onClick={() => history.push(`/users/${id}/edit`)}>
                Edit User
              </Button>
              <Button variant="danger" onClick={handleShow}>
                Delete
              </Button>
            </div>
            {(user && <UserDetails user={user} />) || ''}
          </Col>
        </Row>
      </Col>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
