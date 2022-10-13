const bcrypt = require('bcryptjs');
const User = require('../models/UserModels');

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.json({ emailDuplicate: true });
      }
      return bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          email: email,
          password: hashPassword,
          fullname: fullname,
          image:
            'https://gridfiti.com/wp-content/uploads/2021/09/Lofi-Girl.jpeg',
          avatar:
            'https://gridfiti.com/wp-content/uploads/2021/09/Lofi-Girl.jpeg',
          video: 'WY2PEvj54iY',
        });
        return user.save().then((result) => {
          return res.send({ newUser: result });
        });
      });
    })
    .catch((err) => console.error(err));
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log('not found');
        return res.json({ email: 'Email Not Found. Go to Sign Up' });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.send({ isLoggedIn: true });
            console.log(req.session);
            return req.session.save((err) => {
              console.log(err);
            });
          }
          return res.send({ password: false });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.user = null;

  req.session.save(function (err) {
    if (err) next(err);
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.send('logout');
    });
    console.log(req.session);
  });
};
