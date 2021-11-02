const express = require("express");
const router = express.Router();
const { login, registerUser, updateMeeting, cancelMeeting } = require('../controllers/login');

router.route('/sign-in').post(login);
router.route('/sign-up').post(registerUser);
router.route('/update-meeting/:id').patch(updateMeeting);
router.route('/cancel-meeting/:id').delete(cancelMeeting);

module.exports = router;