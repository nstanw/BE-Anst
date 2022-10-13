const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    email: { type: String, unique: true, trim: true },
    fullname: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'customer'] },
    password: { type: String, trim: true, minlength: 4, select: false },
    avatar: { type: String, trim: true, minlength: 2 },
    image: { type: String, trim: true, minlength: 2 },
    video: { type: String, trim: true, minlength: 2 },
  },
  { timestamp: true }
);
// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
module.exports = mongoose.model('User', userSchema);
