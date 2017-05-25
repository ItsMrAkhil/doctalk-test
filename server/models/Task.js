const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['delete', 'done', 'todo'], default: 'todo' },
}, { timestamps: true });

module.exports = mongoose.model('Task', userSchema);
