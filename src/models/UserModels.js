const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true },
    role: { type: String, enum: ['admin', 'customer'] },
    password: { type: String, required: true, trim: true, minlength: 6 },
    avatar: { type: String, trim: true, minlength: 2 },
    image: { type: String, trim: true, minlength: 2 },
    video: { type: String, trim: true, minlength: 2 },

}, { timestamp: true });

module.exports = mongoose.model('User', userSchema)
