const express = require('express');

const UserControllers = require('../controllers/UserControllers');
const router = express.Router();

router.post('/uploadAvatar', UserControllers.postUploadAvatar);
router.post('/postAvatar', UserControllers.postLinkAvatar);
router.post('/postImg', UserControllers.postUploadImgStudy)


module.exports = router;