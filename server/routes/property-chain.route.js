const controller = require('../controllers/property-chain.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

//http://localhost:8000/api/property-chain/
router.route('/').get(auth, controller.getPropertyChains);

module.exports = router;