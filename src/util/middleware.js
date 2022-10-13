// check session before go to route
'use strict';
var self = module.exports = {
    checkLogin: (req, res, next) => {
        console.log("Middleware checkLogin req.session.user:>>>>", req.session.user);
        if (req.session.user){
            return next();
        }
        return res.redirect('/sign-in')
    }
}