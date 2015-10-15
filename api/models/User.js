/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  tableName: 'users',
  attributes: {
    email: {
      type: "email",
      required: true,
      unique: true
    },
    
    password: {
      type: "string",
      required: true,
    },

    firstname:{
      type: 'string', 
      required: true
    },

    lastname: {
      type: "string",
      required: true
    },

    desc: {
      type: "string",
      required: true
    },

    join_dt: {
      type:'string', 
      required:true
    },
    
    join_tm: {
      type:'string', 
      required:true
    },
  }
};