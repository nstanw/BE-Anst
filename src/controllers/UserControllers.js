const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
const multer = require('multer');

exports.changeImg = function (req, res, next) {
  if (err) {
    return next(err);
  }
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ user: result });
  });
};

exports.register = function (req, res, next) {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ result });
  });
};
exports.updateUser = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const update = req.body;
  const t = User.findOneAndUpdate(
    filter,
    update,
    { upsert: false },
    (err, result) => {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully saved.');
    }
  );
};
exports.updateImage = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const update = req.body;
  const t = User.findOneAndUpdate(
    filter,
    update,
    { upsert: false },
    (err, result) => {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully saved.');
    }
  );
};
exports.getUser = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  User.findOne(filter, (err, result) => {
    if (err) return res.send(500, { error: err });
    return res.send(result);
  });
};
// post study image link
exports.postLinkImageStudy = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const update = {
    image: req.body.image,
  };
  User.findOneAndUpdate(filter, update, { upsert: true, new: true }, (err, result) => {
    if (err) return res.send(500, { error: err });
    return res.send({ result: result });
  });
};
exports.postLinkAvatar = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const update = {
    avatar: req.body.avatar,
  };
  User.findOneAndUpdate(filter, update, { upsert: true, new: true }, (err, result) => {
    if (err) return res.send(500, { error: err });
    return res.send({ result: result });
  });
};

//Upload avatar from file
exports.postUploadAvatar = (req, res, next) => {
  const updateImage = req.file;
  console.log(updateImage);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      image: updateImage,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  if (updateImage) {
    const newAvatar = 'images/' + updateImage.filename;
    return User.findOneAndUpdate(
      { email: 'langthambca@gmail' },
      { avatar: newAvatar }
    )
      .then((result) => {
        console.log('UPDATED PRODUCT!');
        return res.send(result);
      })
      .catch((err) => console.log(err));
  }
  res.status(401).json({ error: 'Please provide an image' });
};
exports.postUploadImgStudy = (req, res, next) => {
  const updateImage = req.file;
  console.log(updateImage);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      image: updateImage,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  if (updateImage) {
    const newAvatar = 'images/' + updateImage.filename;
    const filter = {
      _id: '633267ace2371d4648af00aa',
    };
    return User.findOneAndUpdate(
      filter,
      { image: newAvatar }, 
      {new: true},
    )
      .then((result) => {
        console.log('UPDATED postUploadImgStudy');
        return res.send(result);
      })
      .catch((err) => console.log(err));
  }
  res.status(401).json({ error: 'Please provide an image' });
};

exports.UpdateVideo = async function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const url = req.body.video;
  const checkLinkFull =  url.includes("watch?v=");
  const checkLinkSort =  url.includes("youtu.be/");
  let youtubeId = ''
  if (checkLinkFull) {
      youtubeId = url.split("watch?v=")[1].split("&")[0];
      console.log(youtubeId);
  }
  if (checkLinkSort) {
     youtubeId = url.split("youtu.be/")[1].split("&")[0];
     console.log(youtubeId);
  }

  const update = {
    video: youtubeId,
  };
  console.log(update);
  let doc = await User.findOneAndUpdate(filter, update, {
    new: true
  });
  return res.send({postLinkVideo: true});
}
