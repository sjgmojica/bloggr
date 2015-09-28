/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    signup: function (req, res) {
        res.view();
        if (req.session.flash) {
            console.log(req.session.flash);
            req.session.flash = {};
        }
    },

    create: function (req, res) {
        if (req.body.firstname == null && req.body.lastname == null && req.body.desc == null && req.body.email == null && req.body.password == null) {
            req.session.flash = {'message': 'Required to fill up all the fields'};
            console.log("signup- need to fill up all the fields");
            res.redirect('/register');
        } else {
            User.findOne({email: req.body.email}).exec(function (err, user) {
                if (err) {
                    console.log(err);
                    res.serverError();
                } else {
                    if (user) {
                        req.session.flash = {'message': 'Email Exists'};
                        res.redirect('/register');
                        console.log("SIGNUP");
                    } else {
                        User.create(req.params.all(), function userCreated (err, user){
                            if(err) {
                                console.log(err);
                                req.session.flash = {'message': err};
                                res.redirect('/signup');
                            }
                            console.log("SIGNUP");
                            req.session.flash = {'message': 'Welcome to Bloggr App. Please login to your page'};
                            res.redirect('/login');
                        });
                    }
                }
            });
        }
        /*
        User.create(req.params.all(), function userCreated (err, user){
            if(err) {
                console.log(err);
                req.session.flash = {'message': err};
                return res.redirect('/signup');
            }

            req.session.flash = {'message': 'Welcome to Bloggr App. Please login to your page'};
            res.redirect('/login');
        });
*/
    },


    login: function (req, res) {
        res.view();
    },

    processLogin: function (req, res) {
        User.findOne({email: req.body.email, password: req.body.password}).exec(function (err, user) {
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                if (!user) {
                    req.session.flash = {'message': 'Invalid username or password'};
                    res.redirect('/login');
                } else {
                    req.session.user = user;
                    console.log(req.session);
                    res.redirect('/user');
                }
            }
        });
    },

    index: function (req, res) {
        Blog.find(function foundBlogs (err, blogs) {
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                User.find(function foundUsers (err, users) {
                    if (err) {
                        console.log(err);
                        res.serverError();
                    } else {
                        //req.session.user.user = users;
                        console.log(users);
                        res.view({user: req.session.user, blogs: blogs, friends: users });
                    }
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
                res.serverError();
            } else {
                res.view({user: user});
            }
        });
    },

    update: function (req, res) {
        console.log(req.method);
        console.log("update to");
        var id = req.param("id", null);
        User.findOne(id).exec(function (err, user) {
            if (req.method == "POST" && req.param("User", null)!=null) {
                var val = req.param("User", null);
                user.firstname = val.firstname;
                user.lastname = val.lastname;
                user.desc = val.desc;
                user.email = val.email;
                user.password = val.password;

                user.save(function(err){
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        req.session.user.firstname = user.firstname;
                        req.session.flash = {'message': 'Successfully updated profile'};
                        res.redirect('/');
                    }
                });
            }
        });
    },
};

