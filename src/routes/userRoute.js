const express = require('express');

const UserControllers = require('../controllers/UserControllers');

const router = express.Router();


router.post('/uploadAvatar', UserControllers.postUploadAvatar);


module.exports = router;