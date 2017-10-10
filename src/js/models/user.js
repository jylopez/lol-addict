'use strict'
var db = require('./db');
var mongoose = require('mongoose');
mongoose.connect(db.url, { useMongoClient: true });

var UserSchema = new mongoose.Schema({
    profileIconId: {
      type: Number
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    summonerLevel: {
      type: Number,
    },
    revisionDate: {
      type: Date
    },
    id: {
      type: Number
    },
    accountId: {
      type: Number
    }
  });

  module.exports = mongoose.model('User', UserSchema);