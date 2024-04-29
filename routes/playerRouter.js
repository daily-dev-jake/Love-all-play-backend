const router = require('express').Router();
const playerController = require('../controllers/playerController');
const authController = require('../auth/authController');

router.route('/', authController.authenticateUser);

router.route("/")
.get(playerController.getUserByEmail)
.post(playerController.createPlayer);

router.route("/:id")
.put(playerController.updateUser)
.delete(playerController.deleteUser);


// Need to insert middleware to check if admin shouldn't be exposed
router.route("/debug").get(playerController.getUserById);

module.exports = router;

