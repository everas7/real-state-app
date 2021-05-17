import { useEffect, useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import PropertyCorousel from '../../components/PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import { Breadcrumb, Map, Button, NotFound } from '../../../../app/components';
import { Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import styles from './PropertyDetailPage.module.scss';
import { history } from '../../../../index';
import { AuthorizedComponent } from '../../../../app/authorization/AuthorizedComponent';
import { Permissions } from '../../../../app/authorization/permissions';

export default function PropertyDetailPage(): JSX.Element {
  const [property, setProperty] = useState<Property>();
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(() => {
    Properties.get(parseInt(id, 10))
      .then((res) => {
        setProperty(res);
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 404) {
          setError('Not Found');
        }
      });
  }, [id]);
  let coordinate;

  if (property) {
    coordinate = {
      lat: property?.geolocation.latitude,
      lng: property?.geolocation.longitude,
    };
  }

  function changeAvailability() {
    const propertyValues = property!;
    const propertyForm = {
      name: propertyValues.name,
      description: propertyValues.description,
      floorAreaSize: propertyValues.floorAreaSize,
      price: propertyValues.price,
      rooms: propertyValues.rooms,
      available: !propertyValues.available,
      geolocation: propertyValues.geolocation,
      address: propertyValues.address,
      realtorId: propertyValues.realtorId,
    };
    Properties.update(+id, propertyForm).then((res) => {
      setProperty(res);
    });
  }

  function handleDelete() {
    Properties.delete(+id).then(() => {
      handleCloseDeleteModal();
      history.push('/');
    });
  }
  if (error === 'Not Found') return <NotFound />;
  if (!property) return <div>Loading Apartment...</div>;
  return (
    <>
      <Breadcrumb items={[{ name: 'Appartments', path: '/' }, { name: id }]} />
      <Col className={cx(styles['property-detail-page__content'])}>
        <Row className={cx('')}>
          <Col md="6">
            <Row>
              <PropertyCorousel />
            </Row>
            <Row
              className={cx(styles['property-detail-page__map'], 'flex-grow-1')}
            >
              {(property && coordinate && (
                <Map defaultCenter={coordinate} markers={[coordinate]} />
              )) ||
                ''}
            </Row>
          </Col>
          <Col md="6" className="flex-grow-1">
            <AuthorizedComponent
              rolesAllowed={Permissions.Properties.Detail.ManageAction}
            >
              <div className={styles['property-detail-page__controls']}>
                <Button onClick={() => history.push(`/apartments/${id}/edit`)}>
                  Edit Apartment
                </Button>
                <Button variant="success" onClick={changeAvailability}>
                  {property.available ? 'Set as Rented' : 'Set as Available'}
                </Button>
                <Button variant="danger" onClick={handleShowDeleteModal}>
                  Delete
                </Button>
              </div>
            </AuthorizedComponent>
            {(property && <PropertyDetails property={property} />) || ''}
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
        <Modal.Body>Are you sure you want to delete this apartment?</Modal.Body>
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
