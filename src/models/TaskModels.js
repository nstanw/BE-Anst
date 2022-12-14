const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    email: { type: String, required: true },
    task: {
      name: { type: String, required: true, defaultValue: 'task' },
      countDown: { type: Number, required: true },
    },
    effective: { type: Number, required: true },
    skills: { type: String, required: true, defaultValue: 'no' },
    notes: { type: String },
    ghiChu: { type: String },
    labelsTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
