'use strict';
const DB = require('../server/db');

const ResourcesQueries = {
  index: function(){
    return DB.query('SELECT * FROM resources_view ORDER BY position;');
  },

};

module.exports = ResourcesQueries;