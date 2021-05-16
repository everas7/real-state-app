import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

import { User } from '../../../../app/models/user';
import { Users } from '../../../../app/services/usersApi';
import { Button, Map, IMarker } from '../../../../app/components';
import { history } from '../../../../index';
import styles from './UserListPage.module.scss';
import { AuthorizedComponent } from '../../../../app/hoc/AuthorizedComponent';
import { mapRoleAsString } from '../../../../app/helpers/userHelper';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    Users.list().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <>
      <Col md="12" className={styles['user-list-page__list']}>
        <div className={styles['user-list-page__header']}>
          <div className={styles['user-list-page__header-title']}>Users</div>
          <AuthorizedComponent rolesAllowed={['ADMIN']}>
            <Button onClick={() => history.push('/users/create')}>
              Add User
            </Button>
          </AuthorizedComponent>
        </div>

        <Table striped={true} bordered={true} hover={true}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => history.push(`/users/${user.id}`)}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{mapRoleAsString(user.role)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </>
  );
}
