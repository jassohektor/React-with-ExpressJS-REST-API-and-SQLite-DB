# React with ExpressJS REST API and SQLite DB
React Starter with ExpressJS REST API &amp; SQLite DB (includes JWT, Sequelize and CRUD operations using Axios).

Hi there, this repo contains a fullstack web application created with React library using the virtual DOM feature, which ensures high performance by minimizing direct manipulation of the DOM and follows a component-based architecture, allowing for reusable UI components. I've implemented ExpressJS which is a backend web application framework for building RESTful API to handle http requests and SQLite database to store our data performed by CRUD operations.

Prerequisites: (used to create this project but shouldn't be any issue using higher versions)
- Node v20.11.0 +
- npm v10.2.4 +
- SQLite v3.43.2 +

Steps to create this project from scratch:

**FrontEnd web-app**<br/>
1 - Let's create our React app and use --template to implement typescript for .tsx
  npx create-react-app appName --template typescript

2 - Add the Axios library for making XMLHttpRequests and handle responses in JS
  npm i axios

3 - Install React-Router which is a third-party library that enables routing in React apps.
  npm i react-router

4 - React-Router-Dom is a package that provides bindings for using React Router in web apps.
  npm i react-router-dom

**Backend server-app**
5 - Let’s create a express server project, first run the next command to add our package.json:
npm init

*- Install ExpressJS with:
npm i express

*- Add a new file to the root folder of our server app like index.js
* - Now we can run our app by using Node:
node index.js

* - Install CORS package to allow cross requests:
npm i cors

**Database**
SQLite database engine is a tiny in-process library that implements a self-contained, serverless with TSQL, you can get it from next page https://www.sqlite.org/download.html and try sqlite3 --version after it is installed.

Run next command to create a SQLite database:
sqlite3 ./config/properties.db

Next commands on terminal is going to create the database objects:

CREATE TABLE propertyChains (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  propertyChainName TEXT NOT NULL UNIQUE,
  description TEXT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  active BIT NOT NULL
);

CREATE TABLE locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  locationName TEXT,
  description TEXT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  active BIT NOT NULL
);

CREATE TABLE properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  propertyChainId INTEGER NOT NULL,
  locationId INTEGER NOT NULL,
  propertyName TEXT NOT NULL,
  address TEXT,
  zipCode TEXT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  active BIT NOT NULL,
  FOREIGN KEY(propertyChainId) REFERENCES propertyChains(id),
  FOREIGN KEY(locationId) REFERENCES locations(id)
);
CREATE INDEX idx_property_name_zipcode ON properties (propertyName, zipCode);

CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  propertyId INTEGER NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT,
  email TEXT NOT NULL,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  active BIT NOT NULL,
  FOREIGN KEY(propertyId) REFERENCES properties(id)
);
CREATE UNIQUE INDEX idx_contacts_email ON contacts (email);

CREATE TABLE users (
  uuid TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL, 
  email TEXT NOT NULL UNIQUE, 
  pwd TEXT NOT NULL, 
  photoURL TEXT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  active BIT NOT NULL
);
CREATE INDEX idx_name_email on users (name, email);

Some useful commands below:
.tables <— shows all tables in the DB
drop table properties; <—remember to close commands with semicolon;
PRAGMA index_list('properties'); <-- shows all indices from a table
DROP INDEX [IF EXISTS] idx_property_name_zipcode; <-- I case you wan't to delete an index.

* add next packages:
npm install sqlite3
npm install body-parser
npm install sequelize --save
npm install jsonwebtoken


<img width="1439" alt="Screenshot 2024-05-21 at 3 05 11 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/ae5423d6-4a67-4a70-9b35-8d8a19e06ec7">


<img width="1438" alt="Screenshot 2024-05-21 at 3 07 18 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/39314f6d-1396-4884-9d43-11704118dab1">

<img width="1436" alt="Screenshot 2024-05-21 at 3 07 51 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/00402be7-b5a8-4bdd-81fb-cc14f716f87e">


<img width="1440" alt="Screenshot 2024-05-21 at 3 08 29 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/901bf38e-82ea-4c52-a72a-a046a25d68a9">

I'll be right back to make all this look prettier, I promise!


