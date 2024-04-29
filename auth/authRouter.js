const router = require('express').Router();
const googleAuthController = require('./authController');
router.route('/google', googleAuthController.authenticateUser);

module.exports = router;
