const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: { type: String, required: true, defaultValue: 'task' },
    time: { type: Number, required: true, },
    effective: { type: Number, required: true, },
    skills: { type: String, required: true, defaultValue: 'no' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);