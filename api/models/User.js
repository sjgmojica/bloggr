/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    connection: 'someMongodbServer',
    tableName: 'users',
    attributes: {
        firstname:{type:'string', required:true},
        lastname: {type:'string', required:true},
        desc: {type:'string'},
        email: {type:'email', required:true, unique: true},
        password: {type:'string'}
    }
};