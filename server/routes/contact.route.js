const controller = require('../controllers/contact.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

//http://localhost:8000/api/contact/1@corp.com
router.route('/').get(auth, controller.getContacts);
router.route('/:id').get(auth, controller.getContact);
router.route("/").post(auth, controller.postContact);
router.route("/").put(auth, controller.putContact);
router.route("/:id").delete(auth, controller.deleteContact);

module.exports = router;