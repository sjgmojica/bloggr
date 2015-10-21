/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment  = require("moment");
var date    = new Date();
var frmt_dt = moment(date).format("ddd YYYY-MM-DD h:mm:ss a");

module.exports = {
  // -- profile page
  index : function (req, res) {
    Blog.find({userId : req.session.user.id}).sort({$natural : -1}).exec(function (err, blogs) {
      if (err) {
        return res.serverError(err);
      }
      res.view({blogs: blogs, user: req.session.user});
    });
  },

  // -- new blog
  create: function (req, res) {
    Blog.create({
      title: req.body.blogTitle,
      body: req.body.blogBody,
      dt_post: frmt_dt,
      userId: req.session.user.id
    }, function (err, blog) {
      if(err) {
        return res.redirect("/blog");
      }
      res.redirect("/blog");
    });
  },

  // -- edit blog
  edit: function (req, res) {
    Blog.findOne(req.param("id"), function (err, blog) {
      if (err) {
        return res.serverError();
      }
      res.view({blog: blog});
    });
  },

  // -- update blog
  update: function (req, res) {
    var id = req.param("id", null);
    Blog.update({id: id}, 
      { title : req.body.blogTitle,
      body : req.body.blogBody
    }).exec(function (err, blog) {
      if (err) {
        return res.serverError(err);
      }
      res.ok({});
    });
  },

  // -- delete blog
  delete: function (req, res) {
    var id = req.param("id", null);
    Blog.findOne(id).exec(function (err, blog) {
      blog.destroy(function (err) {
        if (err) {
          return res.serverError();
        }
        res.redirect("/user");
      });
    });
  }  
};