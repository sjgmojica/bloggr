module.exports = {
/*
 //-- Environment
 environment: "test",

 host: "localhost",

 //-- Session
 session: {
   adapter: "memory"
 },

 connections: {
   someMongodbServer: {
     module: "sails-memory",
     host: "localhost",
     user: "",
     password: "",
     database: "bloggr_test"
   }
 },

 models: {
  migrate: "safe"
 }
 */

log: {
  level: "silent"
},
session: {
  adapter: "memory"
},
connections: {
  master: {
    adapter: "sails-memory"
  }
},
models: {
  migrate: "safe"
}
};