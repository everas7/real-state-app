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

# Project Instructions

- Users must be able to create an account and log in.
- Implement a client role:
   - Clients are able to browse rentable apartments in a list and on a map.
- Implement a realtor role:
   - Realtors would be able to browse all rentable- and already rented apartments in a list and on a map.
   - Realtors would be able to CRUD all apartments and set the apartment state to available/rented.
- Implement an admin role:
   - Admins would be able CRUD all apartments, realtors, and clients.
- When an apartment is added, each new entry must have a name, description, floor area size, price per month, number of rooms, valid geolocation coordinates, date added and an associated realtor.
- Geolocation coordinates should be added either by providing latitude/longitude directly or through address geocoding (https://developers.google.com/maps/documentation/javascript/geocoding).
- All users should be able to filter the displayed apartments by size, price, and the number of rooms.
- REST API. Make it possible to perform all user actions via the API, including authentication (If a mobile application and you don’t know how to create your own backend you can use Firebase.com or similar services to create the API).
In both cases, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
- If it's a web application, it must be a single-page application. All actions need to be done client-side using AJAX, refreshing the page is not acceptable. (If a mobile application, disregard this).
- Functional UI/UX design is needed. You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.
- Bonus: unit and e2e tests.

# Additional Notes
TODO
