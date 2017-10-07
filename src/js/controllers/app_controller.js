'use strict';

const AppController = {
  index: function(req,res){
  	const dehydratedInitialState = {
  		user: req.user
  	};
    res.render('app/index', {initialState: dehydratedInitialState});
  }
};

module.exports = AppController;