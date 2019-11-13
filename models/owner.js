const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Animal'
    }
  ]
});

module.exports = mongoose.model('Owner', ownerSchema);