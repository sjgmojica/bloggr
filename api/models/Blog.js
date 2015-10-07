/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  tableName: 'blogs',
  attributes: {
    title:{type:'string', required:true},
    body: {type:'string', required:true},
    dt_post: {type:'string', required:true},
    userId: {type:'string'}    
  }
};

