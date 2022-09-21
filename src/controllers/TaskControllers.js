const Task = require("../models/TaskModels.js");

exports.addTask = function (req, res, next) {
    const newTask = new Task(req.body)
    newTask.save((err, result) => {
        if (err) { return res.json({ err }); }
        res.json({ user: result })
    })
};
exports.getTask = function (req, res, next) {
   Task.find({}, (err, result) => {
    if (err) { return res.json({ err }); }
    res.json({result: result});
   })
};

exports.deleteTask = function(req, res, next){
    Task.remove({_id: req.body.id}, (err) => {
        if(err) {return res.json({err})}
        res.json({'mess': 'Delete success' + req.body.id})
    })
}

//  https://viblo.asia/p/bat-dau-nodejs-mongoose-api-authentication-crud-cho-nguoi-moi-hoc-Eb85oa66Z2G