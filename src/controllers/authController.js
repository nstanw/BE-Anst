const bcrypt = require('bcryptjs');
const User = require('../models/UserModels');

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.json({ duplicate: true })
            }
            return bcrypt.hash(password, 12)
                .then(hashPassword => {
                    const user = new User({
                        email: email,
                        password: hashPassword,
                    })
                    return user.save().then(result => {
                        return res.send({ newUser: result })
                    })
                });
        })
        .catch((err) => console.error(err));
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.send("no user");
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        // req.session.isLoggedIn = true;
                        req.session.user = user;
                        res.send({ password: true });
                        return req.session.save(err => {
                            console.log(err);
                        });
                    }
                    return res.send({ password: false });
                }).catch((err) => console.log(err));
        }).catch(err => console.log(err));
};
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.send('logout');
    });
};