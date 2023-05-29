# Overview

An application that manages apartment rentals.

# Stack
- Back-end: NodeJs
- Front-end: React
- Database Manager: MySql

# Anatomy

The project is composed by an API built on Node.js and a client webapp built with React.

API Structure
- controllers
- custom-typings
- db
- dtos
- helpers
- interfaces
- middlewares
- models
- repositories
- routes
- services
- validators

WebApp Structure
- app
   - assets
   - components
   - constants
   - helpers
   - models
   - routes
   - services
   - store
- features
   - feature-a
      - components
      - pages
      - services
      - validators


# Setting Up Project
## Environment Variables

### API
Copy the .env.example file:
```
cp .env.example .env
```

Modify variables on .env as needed. For example:
```
PORT=7000
DB_USERNAME= root
DB_PASSWORD= DB_P@$$w0rd
DB_DATABASE= demo_ar_db
DB_HOST= localhost
DB_PORT= 3306
JWT_SECRET= top_secret_key_for_jwt_auth
CLOUDINARY_CLOUD_NAME=yourcloudname
CLOUDINARY_API_KEY=youcapikey
CLOUDINARY_API_SECRET=yourapisecret
```


### Webapp
Copy the .env.example file:
```
cp .env.example .env
```

Modify variables on .env as needed. For example:
```
REACT_APP_API_URL=http://localhost:7000/api
REACT_APP_GOOGLE_API_KEY=yourkey
```
Note: The port must be the one where the api is being served.

# Installing Dependencies

API
```
cd api
npm install
```
Web App
```
cd web-app
npm install
```

# Setup DB

Run migrations

```
npm run migrate
```
Run seeders
```
npm run seed
```



# Running Project

```
cd api
npm start
```

```
cd web-app
npm start
```

# Features

- Users are able to create an account and log in.
- Client role:
   - Clients are able to browse rentable apartments in a list and on a map.
- Realtor role:
   - Realtors are able to browse all rentable- and already rented apartments in a list and on a map.
   - Realtors are able to CRUD all apartments and set the apartment state to available/rented.
- Admin role:
   - Admins are able to CRUD all apartments, realtors, and clients.
- Apartments have a name, description, floor area size, price per month, number of rooms, valid geolocation coordinates, date added and an associated realtor.
- Geolocation coordinates can be addedd either by providing latitude/longitude directly or through address geocoding (https://developers.google.com/maps/documentation/javascript/geocoding).
- All users are able to filter the displayed apartments by size, price, and the number of rooms.
- REST API. It's possible to perform all user actions via the API, including authentication.

# Additional Notes
TODO
