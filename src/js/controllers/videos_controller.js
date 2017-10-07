'use strict';
const VideosQueries = require('../queries/videos_queries');

const VideosController = {
  index: function(req,res){
    return VideosQueries.index().then(videos => {
      res.json({videos: videos});
    });
  }
};

module.exports = VideosController;