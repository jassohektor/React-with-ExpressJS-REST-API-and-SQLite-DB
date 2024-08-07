**<p align="center">REACT with EXPRESS-JS REST API & SQLite DB</p>**
<br/>
React Starter with ExpressJS REST API &amp; SQLite DB (includes JWT, Sequelize and CRUD operations using Axios).

Hi there, this repo contains a fullstack web application created with React library using the virtual DOM feature, which ensures high performance by minimizing direct manipulation of the DOM and follows a component-based architecture, allowing for reusable UI components. I've implemented ExpressJS which is a backend web application framework for building RESTful API to handle http requests and SQLite database to store our data performed by CRUD operations.

Prerequisites: (used to create this project but shouldn't be any issue using higher versions)
- Node v20.11.0 +
- npm v10.2.4 +
- SQLite v3.43.2 +
<br/>
<p align="center">Steps to create this project from scratch:</p>

**FrontEnd web-app**
<br/>
1 - Let's create our React app and use --template to implement typescript for tsx.<br/>
  npx create-react-app appName --template typescript

2 - Add the Axios library for making XMLHttpRequests and handle responses in JS.<br/>
  npm i axios

3 - Install React-Router which is a third-party library that enables routing in React apps.<br/>
  npm i react-router

4 - React-Router-Dom is a package that provides bindings for using React Router in web apps.<br/>
  npm i react-router-dom
<br/>
<br/>
**Backend server-app**
<br/>
<br/>
5 - Let’s create a express server project, first run the next command to add our package.json:<br/>
npm init

6- Install ExpressJS with next comman on terminal:<br/>
npm i express

7- Add a new file to the root folder of our server app like index.js<br/>
* - Now we can run our app by using Node:<br/>
node index.js


**Database**
SQLite database engine is a tiny in-process library that implements a self-contained, serverless with TSQL, you can get it from next page https://www.sqlite.org/download.html and try to run sqlite3 --version to check is ok.

Run next command to create a SQLite database:<br/>
sqlite3 ./config/properties.db
<br/>
<p align="center">Next commands on terminal is going to create the database objects:</p>

CREATE TABLE propertyChains (<br/>
  id INTEGER PRIMARY KEY AUTOINCREMENT,<br/>
  propertyChainName TEXT NOT NULL UNIQUE,<br/>
  description TEXT,<br/>
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,<br/>
  active BIT NOT NULL<br/>
);<br/>
<br/>
CREATE TABLE locations (<br/>
  id INTEGER PRIMARY KEY AUTOINCREMENT,<br/>
  locationName TEXT,<br/>
  description TEXT,<br/>
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,<br/>
  active BIT NOT NULL<br/>
);<br/>
<br/>
CREATE TABLE properties (<br/>
  id INTEGER PRIMARY KEY AUTOINCREMENT,<br/>
  propertyChainId INTEGER NOT NULL,<br/>
  locationId INTEGER NOT NULL,<br/>
  propertyName TEXT NOT NULL,<br/>
  address TEXT,<br/>
  zipCode TEXT,<br/>
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,<br/>
  active BIT NOT NULL,<br/>
  FOREIGN KEY(propertyChainId) REFERENCES propertyChains(id),<br/>
  FOREIGN KEY(locationId) REFERENCES locations(id)<br/>
);<br/>
<br/>
CREATE INDEX idx_property_name_zipcode ON properties (propertyName, zipCode);<br/>
<br/>
CREATE TABLE contacts (<br/>
  id INTEGER PRIMARY KEY AUTOINCREMENT,<br/>
  propertyId INTEGER NOT NULL,<br/>
  firstName TEXT NOT NULL,<br/>
  lastName TEXT,<br/>
  email TEXT NOT NULL,<br/>
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,<br/>
  active BIT NOT NULL,<br/>
  FOREIGN KEY(propertyId) REFERENCES properties(id)<br/>
);<br/>
<br/>
CREATE UNIQUE INDEX idx_contacts_email ON contacts (email);<br/>
<br/>
CREATE TABLE users (<br/>
  uuid TEXT PRIMARY KEY NOT NULL UNIQUE,<br/>
  name TEXT NOT NULL, <br/>
  email TEXT NOT NULL UNIQUE, <br/>
  pwd TEXT NOT NULL, <br/>
  photoURL TEXT,<br/>
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,<br/>
  active BIT NOT NULL<br/>
);<br/>
<br/>
CREATE INDEX idx_name_email on users (name, email);<br/>
<br/>
Some useful commands below:<br/>
.tables <— shows all tables in the DB<br/>
drop table properties; <—remember to close commands with semicolon;<br/>
PRAGMA index_list('properties'); <-- shows all indices from a table<br/>
DROP INDEX [IF EXISTS] idx_property_name_zipcode; <-- In case you wan't to delete an index.<br/>
<br/>
* Install CORS package to allow cross requests, install Sequelize which is an object relational mapping library that supports many databases and also install jsonwebtoken to sign and verify the JSON Web Token used to manage user timeout and sessions.

* Add next packages:<br/>
npm install cors<br/>
npm install sqlite3<br/>
npm install body-parser<br/>
npm install sequelize --save<br/>
npm install jsonwebtoken<br/>
<br/>
<br/>
- Notice I'm using sequelize to map the database objects into defined models and exposing data in controllers through routes, also you can see the server app running in my terminal logged in all executed commands after each request. I've used different approaches to execute CRUD operations and http response status codes to interpret each scenario possible when user makes a request thru the React app.
<img width="1440" alt="Screenshot 2024-05-21 at 3 29 47 p m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/fbe2c645-5773-4990-b847-c50b4570e95a">

- I would love to spend time explaining every section of the code in charge to perform all UI actions and how http requests return the expected data but I need to get back to work to pay bills, bank loan and food to survive, so you have to take a look into the folder structure to learn how it works. I tried to use best practices and put everything in the right place but the lack of time made me a bit lazy in some parts of it. however I believe this is the most complete fullstack project around internet.
<img width="1439" alt="Screenshot 2024-05-21 at 3 05 11 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/ae5423d6-4a67-4a70-9b35-8d8a19e06ec7">

- Here you can execute all CRUD operations in real time on the profile.tsx file we can find how to validate some fields, make http requests using Axios and component data flow between the listView and the main form passing props with states generated from the context.
<img width="1438" alt="Screenshot 2024-05-21 at 3 07 18 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/39314f6d-1396-4884-9d43-11704118dab1">

- The next data table flow is pretty cool because it can look up for any property you're typing in the search-box and additionally you can also load up more data from the database which is around 1000 records stored.
<img width="1436" alt="Screenshot 2024-05-21 at 3 07 51 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/00402be7-b5a8-4bdd-81fb-cc14f716f87e">

- In case the record you're looking for does not exist in the current properties state, no worries! hit enter in the search-box or press the load button to re-load the state with a new bunch of records.
<img width="1440" alt="Screenshot 2024-05-21 at 3 08 29 a m" src="https://github.com/jassohektor/React-with-ExpressJS-REST-API-and-SQLite-DB/assets/168608755/901bf38e-82ea-4c52-a72a-a046a25d68a9">
<br/>
<br/>
<p align="center">Notes</p>

Well, I do not master React like I do for Angular because I have more experience building large-scale complex apps for big industries but I get to understand all process involved to create an app from scratch with SOLID practices, so what I have done on this project can provide a perspective about how to face some user needs with those technologies.
