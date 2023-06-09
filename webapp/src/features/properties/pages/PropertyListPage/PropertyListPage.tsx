import React, { useEffect, useState } from 'react';
import { Row, Col, CardDeck, Container, ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import { FaList, FaMap } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

import PropertyFilters from '../../components/PropertyFilters/PropertyFilters';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Button, Map, IMarker, Navbar } from '../../../../app/components';
import { history } from '../../../../index';
import styles from './PropertyListPage.module.scss';
import { AuthorizedComponent } from '../../../../app/authorization/AuthorizedComponent';
import { Permissions } from '../../../../app/authorization/permissions';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  fetchProperties,
  selectLoadingList,
  selectPage,
  selectProperties,
  selectTotalPages,
  setPage,
} from '../../services/propertiesSlice';

interface SelectProtected {
  readonly listElement: HTMLElement | null;
}

const defaultCoordinates = {
  lat: 40.73061,
  lng: -73.935242,
};

export default function PropertyListPage() {
  const dispatch = useAppDispatch();

  const properties = useAppSelector(selectProperties);
  const pageCount = useAppSelector(selectTotalPages);
  const page = useAppSelector(selectPage);
  const loading = useAppSelector(selectLoadingList);

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const center = properties[0]
    ? {
        lat: properties[0]?.geolocation.latitude || 0,
        lng: properties[0]?.geolocation.longitude || 0,
      }
    : defaultCoordinates;

  const coordinates = properties.map((p) => ({
    id: p.id,
    price: p.price,
    lat: p.geolocation.latitude,
    lng: p.geolocation.longitude,
  }));

  const [popupCoordinates, setPopupCoordinates] =
    useState<undefined | IMarker>();

  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  function handleMarkerClick(id: number) {
    history.push(`/apartments/${id}`);
  }

  function handleMarkerMouseIn(id: number) {
    const coord = coordinates.find((c) => c.id === id)!;
    setPopupCoordinates({
      id: coord.id!,
      lat: coord.lat,
      lng: coord.lng,
    });
  }

  function handleMarkerMouseOut() {
    setPopupCoordinates(undefined);
  }

  function handlePageClick({ selected }: { selected: number }) {
    dispatch(setPage(selected + 1));
    dispatch(fetchProperties());

    const selectProtected: SelectProtected = {
      listElement: document.getElementById('property-list'),
    };
    selectProtected.listElement!.scroll({ top: 0, behavior: 'smooth' });
  }

  const Popup = () => {
    if (!popupCoordinates) return null;
    let propertyInfo = properties.find((p) => p.id === popupCoordinates.id);
    propertyInfo = propertyInfo!;
    return (
      <div className={styles['property-list-page__map-property']}>
        <PropertyCard
          title={propertyInfo.name}
          rooms={propertyInfo.rooms}
          price={propertyInfo.price}
          floorAreaSize={propertyInfo.floorAreaSize}
          address={propertyInfo.address}
          available={propertyInfo.available}
          photo={propertyInfo.photo || null}
          column={true}
        />
      </div>
    );
  };

  return (
    <Container
      fluid={true}
      className="d-flex flex-column vh-100 overflow-hidden"
    >
      <Row>
        <Navbar />
      </Row>
      <Row className="flex-grow-1 overflow-hidden">
        <Col md="3" lg="2" xl="2" className="mh-100">
          <Button
            className="d-sm-block d-md-none w-100 mb-2"
            onClick={() => setShowFilters(!showFilters)}
            variant="light"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <PropertyFilters
            className={cx(
              {
                collapse: !showFilters,
              },
              'd-md-block'
            )}
          />
        </Col>
        <Col
          md="9"
          lg="7"
          xl="5"
          id="property-list"
          className={cx(
            styles['property-list-page__list'],
            {
              collapse: showMap,
            },
            'd-lg-block'
          )}
        >
          <AuthorizedComponent
            rolesAllowed={Permissions.Properties.List.AddButton}
          >
            <div className={styles['property-list-page__header']}>
              <div className={styles['property-list-page__header-title']}>
                Apartments
              </div>
              <Button onClick={() => history.push('/apartments/create')}>
                Add Apartment
              </Button>
            </div>
          </AuthorizedComponent>

          {loading ? (
            <ProgressBar className="mb-3" animated={true} now={100} />
          ) : (
            ''
          )}
          {!loading && !properties.length ? (
            <Row md="12" className="justify-content-center">
              <Col md="8" className="text-left">
                <h4 className="mb-4">
                  Sorry, we couldn't find any properties available with the
                  current filters.
                </h4>
              </Col>
            </Row>
          ) : (
            ''
          )}
          <CardDeck className={cx(styles['property-list-page__card-deck'])}>
            <Row>
              {properties.map((property, i) => (
                <Col
                  md="12"
                  onClick={() => history.push(`/apartments/${property.id}`)}
                  key={`property_card-${i}`}
                >
                  <PropertyCard
                    title={property.name}
                    rooms={property.rooms}
                    price={property.price}
                    floorAreaSize={property.floorAreaSize}
                    address={property.address}
                    available={property.available}
                    photo={property.photo || null}
                  />
                </Col>
              ))}
            </Row>
          </CardDeck>
          {properties.length ? (
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={pageCount}
              forcePage={page - 1}
              initialPage={0}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          ) : (
            ''
          )}
        </Col>
        <Col
          md="9"
          lg="3"
          xl="5"
          className={cx(
            'overflow-hidden mh-100',
            {
              collapse: !showMap,
            },
            'd-lg-block'
          )}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <Map
              defaultCenter={defaultCoordinates}
              center={center}
              markers={coordinates}
              onMarkerClick={handleMarkerClick}
              onMarkerMouseIn={handleMarkerMouseIn}
              onMarkerMouseOut={handleMarkerMouseOut}
              popupComponent={Popup}
              popupInfo={popupCoordinates}
            />
          </div>
        </Col>
        <Button
          float={true}
          variant={'dark'}
          className={cx(
            'd-none d-md-block d-lg-none',
            styles['property-list-page__map-toggle-btn']
          )}
          onClick={() => setShowMap(!showMap)}
        >
          <span className="mr-1">{showMap ? 'List' : 'Map'}</span>
          {showMap ? <FaList /> : <FaMap />}
        </Button>
      </Row>
    </Container>
  );
}
