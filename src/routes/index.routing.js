const express = require("express");
const router = express.Router();

router.get('/bee', function (req, res, next) {
    res.send('Welcome to the Beestudy')
});

module.exports = router;