const express = require('express')
const router = express.Router()
const { register, updateUser, getUser, postAvatar, UpdateVideo } = require('../controllers/UserControllers')
const { addTask, getTask, deleteTask } = require('../controllers/TaskControllers')
const authRoute = require('./authRoute')

// router.post('/register', UserValidator, register)

router.use('/auth', authRoute)
router.post('/updatevideo', UpdateVideo)
router.post('/postAvatar', postAvatar)
router.get('/getUser', getUser)
router.post('/register', register)
router.patch('/updateUser', updateUser)
router.post('/addtask', addTask)
router.get('/gettask', getTask)
router.delete('/delete', deleteTask)
router.get('/', (req, res) => {
    res.send("home /");
})

module.exports = router;
