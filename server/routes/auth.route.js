const controller = require('../controllers/user.controller');
const router = require('express').Router();

router.route('/login').post(controller.postLogin);
router.route('/').post(controller.postUser); //register

module.exports = router;