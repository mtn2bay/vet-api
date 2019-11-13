const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  animal: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);