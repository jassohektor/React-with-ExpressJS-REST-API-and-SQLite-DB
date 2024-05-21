const controller = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

//http://localhost:8000/api/user/?
router.route('/').get(auth, controller.getUsers);
router.route("/").put(auth, controller.putUser);
router.route("/:uuid").delete(auth, controller.deleteUser);

module.exports = router;