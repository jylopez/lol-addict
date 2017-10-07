'use strict';

const UsersController = {
  new: function(req,res){
    // TODO: create users_queries and connect to mongo
    res.json({user: "new user!"});
  }
};

module.exports = UsersController;