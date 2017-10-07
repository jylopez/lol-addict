'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
const ResourcesQueries = require('../queries/resources_queries');

const ResourcesController = {
  index: function(req,res){
    return ResourcesQueries.index().then(resources => {
      for (var i = 0; i < resources.length; i++) {
        if (resources[i].filename) {
          resources[i].signedUrl = s3.getSignedUrl('getObject', {
            Bucket: process.env.S3_RESOURCES_BUCKET,
            Key: resources[i].filename,
            Expires: 60*60*24// in seconds
          })
        } else {
          resources[i].filename = null;
        }
      }
      res.json({resources: resources});
    });
  }
};

module.exports = ResourcesController;