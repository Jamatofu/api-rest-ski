'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  urlImage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('News', NewsSchema);