'use strict';
require('dotenv').load();
const Promise = require('bluebird');
const pg = require('pg');
const EventEmitter = require('events').EventEmitter;
const url = require('url');
 
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
 
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  promise: Promise,
};

var pool = new pg.Pool(config);

const _getConnection = function(){
  return new Promise((resolve,reject) => {
    return resolve(pool.connect());
  }).disposer(client => {
    if(client){ client.release(); }
  });
};

// For simple queries
// DB.query({text: '', values: []}).then(rows => ... )
const _query = function(preparedStatement){
  return Promise.using(_getConnection(),client => {
    return client.query(preparedStatement).then(r => r.rows);
  });
};

// transactions not working quite yet, needs more debugging

// const getTransaction = function() {
//     return new Promise((resolve,reject) => {
//       pool.connect().then(client => {
//         client.query('BEGIN').then(() => {
//           resolve(client);
//         });
//       });
//     }).disposer((client,promise) => {
//       if(client){ 
//         if(promise.isFulfilled()){
//           return client.query('COMMIT').then(() => {
//             client.release(); 
//           });
//         } else {
//           return client.query('ROLLBACK').then(() => {
//             client.release(); 
//           });
//         }
//       }
//     });
// };

// // For transactions
// // DB.transaction().then(query => {
// //   return query({text: '', values: []}).then( rows => {
// //     return query({text: '', values: []});
// //   }).then( rows => {
// //     return query({text: '', values: []});
// //   }
// // });
// const _transaction = function(){
//   return Promise.using(getTransaction(),client => {
//     return (preparedStatement) => client.query(preparedStatement).then(r => r.rows );
//   });
// };

const DB = new EventEmitter();
DB.query = _query;
// DB.transaction = _transaction;
DB.first = function(rows){ return rows[0]; };

// For NOTIFY/LISTEN
// const listenClient = new pg.Client(process.env.DATABASE_URL);
// listenClient.connect();
// listenClient.on('notification',m => DB.emit(m.channel,m.payload) );

module.exports = DB;