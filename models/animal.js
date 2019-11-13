const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  }
});

module.exports = mongoose.model('Animal', animalSchema);