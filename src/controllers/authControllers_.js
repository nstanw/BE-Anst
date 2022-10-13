const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/UserModels');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const bcrypt = require('bcryptjs');
const UserModels = require('./../models/UserModels');
 

// Create JWT sign token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    // expiresIn: 1
  });
};

// Creacte token from signTonken then send to user
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // make the browser cannot modify the cookie
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// SIGNUP USER
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  console.log(process.env.JWT_COOKIE_EXPIRES_IN);
  createSendToken(newUser, 201, res);
});

//LOGIN USER
exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  // 1. Check email and password exits
  if (!email || !password) {
    return res.send('Please provide email and password!');
  }
  // 2) Check if user exists && password is correct
  /**By default, select for password is set to false.
   * Need to add select('+password) to set select to true. */
  const user = await User.findOne({ email }).select('+password');
  const flag = user.password === password;
  if (flag) {
    return createSendToken(user, 200, res);
  }
  return next(res.send({ message: 'Authentication failed. Wrong password.' }));
});

//PROTECT
exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check if it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      // new AppError('You are not logged in! Please log in to get access.', 401)  
      res.json({ login: false,
        message: 'You are not logged in! Please log in to get access.'
      })
    );
  }

  // 2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  //GRANT ACCESS
  req.user = currentUser;
  next();
});
