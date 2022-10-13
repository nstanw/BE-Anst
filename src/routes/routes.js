const express = require('express')
const router = express.Router()
const { register, updateUser, getUser, postLinkImageStudy,postUploadImgStudy, UpdateVideo } = require('../controllers/UserControllers')
const { addTask, getTask, deleteTask } = require('../controllers/TaskControllers')
const authRoute = require('./authRoute')
const userRoute = require('./userRoute')

const User_Controller =  require("../controllers/authControllers_");

//signup
router.post('/signup', User_Controller.signup )
router.post('/login', User_Controller.login )

// Protect all the routes affter this middleware
router.use(User_Controller.protect);

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
