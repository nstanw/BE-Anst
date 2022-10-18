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
    expiresIn: '24h',
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
    // httpOnly: true, // make the browser cannot modify the cookie
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('access_token', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

// SIGNUP USER
exports.signup = catchAsync(async (req, res, next) => {
  const checkEmail = await User.findOne({ email: req.body.email });
  if (!checkEmail) {
    const newUser = await User.create({
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
      image:
        req.body.image ||
        'https://gridfiti.com/wp-content/uploads/2021/09/Lofi-Girl.jpeg',
      avatar: req.body.avatar || 'images/1665068658108-maxresdefault.jpg',
      video: req.body.video || 'nHeuZ8EIbSU',
    });
    console.log(process.env.JWT_COOKIE_EXPIRES_IN);
    return createSendToken(newUser, 201, res);
  }
  return res.json({ email: 'used' });
});

//LOGIN USER
exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
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
  console.log({ user });
  if (!user) {
    return res.json({ error: 'email not found' });
  }
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
  console.log('req.headers.authentication>>>>>>:', req.headers.authentication);
  if (req.headers.authentication && req.headers.authentication.startsWith('Bearer ')) {
    // console.log('req.headers--------', req.headers.authorization);
    token = req.headers.authentication.split(' ')[1];
    console.log('token>>>>>>:', token);
  }

  if (!token) {
    return next(
      res.json({
        login: false,
        message: 'You are not logged in! Please log in to get access.',
      })
    );
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(400);
    throw error;
  }

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
