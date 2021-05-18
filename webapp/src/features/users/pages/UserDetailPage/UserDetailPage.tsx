import React, { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import UserDetails from '../../components/UserDetails/UserDetails';
import {
  Breadcrumb,
  Button,
  NotFound,
  IconButton,
} from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { Users } from '../../../../app/services/usersApi';
import styles from './UserDetailPage.module.scss';
import { history } from '../../../../index';
import { Role } from '../../../../app/models/role';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function UserDetailPage(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

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
      handleCloseDeleteModal();
      history.push('/users');
    });
  }
  if (error === 'Not Found') return <NotFound />;
  if (!user) return <div>Loading User...</div>;
  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[{ name: 'Users', path: '/users' }, { name: id }]}
            />
          </Col>
        </Row>
      </Col>
      <Col md="12" className={cx(styles['user-detail-page__content'])}>
        <Row className={cx('')}>
          <Col md="12">
            <div className={styles['user-detail-page__controls']}>
              <IconButton
                onClick={() => history.push(`/users/${id}/edit`)}
                icon={<FaEdit />}
              >
                Edit
              </IconButton>
              <IconButton
                variant="danger"
                icon={<FaTrashAlt />}
                onClick={handleShowDeleteModal}
              >
                Delete
              </IconButton>
            </div>

            {(user && (
              <div className={styles['user-detail-page__details-container']}>
                <UserDetails user={user} />
              </div>
            )) ||
              ''}
          </Col>
        </Row>
      </Col>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
          {user.role === Role.Realtor && (
            <div>
              Performing this action would result on deleting all apartments
              associated with this realtor
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseDeleteModal}>
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
