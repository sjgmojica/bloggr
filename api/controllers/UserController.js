/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment  = require("moment");
var date    = new Date();
var frmt_dt = moment(date).format('MMMM-DD-YYYY');
var frmt_tm = moment(date).format('h:mm:ss');

module.exports = {
  // -- signup
  create: function (req, res) {
    User.findOne({email: req.body.email}).exec(function (err, user) {
      if (err) {
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
          }, function userCreated (err, user) {
            if(err) {
              return res.serverError(err);
            }
            res.ok({});
          });
        }
      }
    });
  },

  // -- login
  processLogin: function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
      if (err) {
        res.serverError(err);
      } else if (user === undefined) {
        res.ok({error: true, message: "The email and password you entered did not match our records. Please double-check and try again."});
      } else {
        req.session.user = user;
        res.redirect("/home");
      }
    });
  },

  // -- homepage after sucessful login/timeline
  index: function (req, res) { 
    Blog.find({$query: {}, $orderby: {$natural : -1}}, function (err, blogs) {
      if (err) {
        res.serverError();
      } else {
        User.find(function (err, users) {
          if (err) {
            return res.serverError();
          }
          res.view({user: req.session.user, blogs: blogs, friends: users });
        });
      }
    });
  },

  // -- logout
  logout: function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },

  // -- edit user profile page
  edit: function (req, res) {
    User.findOne(req.param('id'), function (err, user) {
      if (err) {
        return res.serverError(err);
      }
      res.view({user: user});
    });
  },

  // -- update user profile page
  update: function (req, res) {
    var id = req.param("id", null);
    User.update({id: id},
      { firstname : req.body.firstname,
        lastname : req.body.lastname,
        desc : req.body.desc,
        email : req.body.email,
        password : req.body.password})
    .exec(function (err, user) {
      if (err) {
        return res.ok({error: true, message: "All fields are required" });
      } 
      req.session.user = user[0];
      res.ok({});
    });
  }
};

