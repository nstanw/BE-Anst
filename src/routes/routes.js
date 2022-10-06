const express = require('express')
const router = express.Router()
const { register, updateUser, getUser, postLinkImageStudy, UpdateVideo } = require('../controllers/UserControllers')
const { addTask, getTask, deleteTask } = require('../controllers/TaskControllers')
const authRoute = require('./authRoute')
const userRoute = require('./userRoute')

// router.post('/register', UserValidator, register)

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.post('/updatevideo', UpdateVideo)
router.post('/postlinkimage', postLinkImageStudy)
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
