const express = require('express')
const router = express.Router()
const {register} = require('../controllers/UserControllers')
const {UserValidator} = require('../validators/validator')
const {addTask, getTask, deleteTask} = require('../controllers/TaskControllers')

// router.post('/register', UserValidator, register)
router.post('/addtask', addTask )
router.get('/gettask', getTask )
router.delete('/delete', deleteTask )
router.get('/', (req, res) => {
    res.send("home /");
})

module.exports = router;
