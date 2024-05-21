const controller = require('../controllers/location.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

//http://localhost:8000/api/location/
router.route('/').get(auth, controller.getLocations);

module.exports = router;