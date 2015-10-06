/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment  = require("moment");
var date    = new Date();
var frmt_dt = moment(date).format('MMMM DD YYYY');
var frmt_tm = moment(date).format('h:mm:ss');

module.exports = {
    
    create: function (req, res) {
        console.log(req.body.email);
        User.findOne({email: req.body.email}).exec(function (err, user) {
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                if (user) {
                    res.ok({error: true, message: "Email already exists"});
                } else {
                    User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        desc: req.body.desc,
                        join_dt: frmt_dt,
                        join_tm: frmt_tm,
                        email: req.body.email,
                        password: req.body.password
                    }, function userCreated (err){
                        if(err) {
                            console.log(err);
                            return res.serverError(err);
                        }
                        res.ok({});
                    });
                }
            }
        });
    },

    processLogin: function (req, res) {
        console.log(req.method);
        console.log(req.body.email);
        User.findOne({email: req.body.email, password: req.body.password}).exec(function (err, user) {
            console.log(user);
            if (err) {
                console.log(err);
                res.serverError(err);
            } else if (user === undefined) {
                res.ok({error: true, message: "The email and password you entered did not match our records. Please double-check and try again."});
            } else {
                if (!user) {
                    console.log("test");
                    res.ok({error: true, message: "Invalid email or password"});
                } else {
                    req.session.user = user;
                    console.log(req.session);
                    res.redirect('/home');
                }
            }
        });
    },

    index: function (req, res) { 
        Blog.find({$query: {}, $orderby: {$natural : -1}}, function foundBlogs (err, blogs) {
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                User.find(function foundUsers (err, users) {
                    if (err) {
                        console.log(err);
                        return res.serverError();
                    }
                    console.log(users);
                    res.view({user: req.session.user, blogs: blogs, friends: users });
                });
            }
        });
    },

    logout: function (req, res) {
        req.session.destroy();
        console.log("LOGOUT");
        res.redirect('/');
    },

    edit: function (req, res) {
        User.findOne(req.param('id'), function foundUser (err, user) {
            if (err) {
                console.log(err);
                return res.serverError(err);
            }
            res.view({user: user});
        });
    },

    update: function (req, res) {
        console.log(req.method);
        console.log("update to");
        var id = req.param("id", null);
        console.log(id);
        console.log(req.body.firstname);
        
        User.update({id: id},
            { firstname : req.body.firstname,
              lastname : req.body.lastname,
              desc : req.body.desc,
              email : req.body.email,
              password : req.body.password})
            .exec(function updateProfile(err, user) {
                if (err) {
                    console.log(err);
                    return res.serverError(err);
                } 
                console.log("success update");
                req.session.user = user[0];
                res.ok({});
        });
    },
};

