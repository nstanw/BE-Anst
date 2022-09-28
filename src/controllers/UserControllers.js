const User = require('../models/UserModels');
const bcrypt = require('bcrypt');

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
  const update = req.body
 const  t =  User.findOneAndUpdate(filter, update,{upsert: false}, (err, result) => {
  if (err) return res.send(500, {error: err});
  return res.send('Succesfully saved.');
 })
};
exports.updateImage = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  const update = req.body
 const  t =  User.findOneAndUpdate(filter, update,{upsert: false}, (err, result) => {
  if (err) return res.send(500, {error: err});
  return res.send('Succesfully saved.');
 })
};
exports.getUser = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  };
  User.findOne(filter, (err, result) => {
  if (err) return res.send(500, {error: err});
  return res.send(result);
 })
};
exports.postAvatar = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  }; 
  const update = {
    image : req.body.image
  }
  User.findOneAndUpdate(filter, update,{upsert: false}, (err, result) => {
    if (err) return res.send(500, {error: err});
    return res.send(' image Succesfully saved.');
   })
};
exports.UpdateVideo = function (req, res, next) {
  const filter = {
    _id: '633267ace2371d4648af00aa',
  }; 
  User.findById(filter).then(Use => {
    Use.video = req.body.video
    return Use.save();
  })
  .then( result => {
    console.log("Update link Video",result);
    res.send({result : result});
  })
  .catch(err => console.log(err))

  // User.findOneAndUpdate(filter, update,{upsert: false}, (err, result) => {
  //   if (err) return res.send(500, {error: err});
  //   return res.send(' video Succesfully saved.');
  //  })
};

// exports.register = function (req, res, next) {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (user == null) {
//       //Kiểm tra xem email đã được sử dụng chưa
//       bcrypt.hash(req.body.password, 10, function (err, hash) {
//         //Mã hóa mật khẩu trước khi lưu vào db
//         if (err) {
//           return next(err);
//         }
//         const user = new User(req.body);
//         user.role = ['customer']; //sau khi register thì role auto là customer
//         user.password = hash;
//         user.password_confirm = hash;
//         user.save((err, result) => {
//           if (err) {
//             return res.json({ err });
//           }
//           res.json({ user: result });
//         });
//       });
//     } else {
//       res.json({ err: 'Email has been used' });
//     }
//   });
// };
