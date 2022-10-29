const Task = require('../models/TaskModels.js');

exports.addTask = function (req, res, next) {
  const newTask = new Task(req.body);
  newTask.save((err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.send(result);
  });
};
exports.getTask = function (req, res, next) {
  const filter = {
    email : req.user.email
  }
  Task.find(filter, (err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.json(result);
  });
};
exports.getTaskViaDay = function (req, res, next) {
  Task.find({}, (err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.json(result);
    console.log(result);
  });
};

exports.deleteTask = function (req, res, next) {
  Task.remove({ effective: req.body.effective }, (err, result) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ mess: 'Delete success', result: result });
  });
};