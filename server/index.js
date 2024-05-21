const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require("body-parser");
const HTTP_PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Root endpoint:

app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/user', require('./routes/user.route.js'));
app.use('/api/property', require('./routes/property.route.js'));
app.use('/api/contact', require('./routes/contact.route.js'));
app.use('/api/property-chain', require('./routes/property-chain.route.js'));
app.use('/api/location', require('./routes/location.route.js'));

// Start server:
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port: ${HTTP_PORT}`);
});