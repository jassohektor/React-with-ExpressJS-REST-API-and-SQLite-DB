const controller = require('../controllers/property.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

//http://localhost:8000/api/property/AC%20Hotel
router.route('/:searchText').get(auth, controller.getProperties);
router.route("/").post(auth, controller.postProperty);
router.route("/").put(auth, controller.putProperty);
router.route("/:id").delete(auth, controller.deleteProperty);

module.exports = router;