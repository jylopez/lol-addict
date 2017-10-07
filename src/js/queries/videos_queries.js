'use strict';
const DB = require('../server/db');

const VideosQueries = {
  index: function(){
    return DB.query('SELECT * FROM videos ORDER BY position;');
  },

};

module.exports = VideosQueries;