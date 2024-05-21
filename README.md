# React-with-ExpressJS-REST-API-and-SQLite-DB
React with ExpressJS REST API &amp; SQLite-DB (includes JWT, Sequelize and CRUD operations using Axios)

Install: Node >= 14 in your local environment . You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

* - Use --template to implement typescript for .tsx
npx create-react-app appName --template typescript

* - Axios is a library for making XMLHttpRequests and handling responses in JS
npm i axios

* - React-Router is a third-party library that enables routing in React apps.
npm i react-router

* - React-Router-Dom is a package that provides bindings for using React Router in web apps.
npm i react-router-dom

* - Let’s create a express project - server, first run the next command to add our package.json:
npm init

*- Install ExpressJS with:
npm install express

*- Add a new file to the root folder of our server app like index.js
* - Now we can run our app by using Node:
node index.js

* - Install CORS package to allow cross requests:
npm install cors


Prerequisites: 
Node.js and Express Js.

SQLite is installed and running on your system, you can get it from next page https://www.sqlite.org/download.html and try sqlite3 --version after it is installed.

Run next command to create a SQLite database:
sqlite3 ./config/properties.db

Next command on terminal is going to create the database objects:

Some useful commands below:
.tables <— shows all tables in the DB
drop table properties; <—remember to close commands with semicolon;
drop table locations;
drop table propertyChains;

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


PRAGMA index_list('properties');
DROP INDEX [IF EXISTS] idx_property_name_zipcode;

* add next sqlite package
npm install sqlite3
npm install body-parser
npm install sequelize --save
npm install jsonwebtoken

