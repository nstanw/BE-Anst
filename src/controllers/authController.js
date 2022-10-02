const user = require('../models/UserModels');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else{
        message = null;
    }
    res.send({
        path: 'login',
        errorMessage: message
    })
};