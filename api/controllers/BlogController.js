/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index : function (req, res) {
        /*
        Blog.find({userId : req.session.user.id}, function foundBlogs (err, blogs) {
            if (err) {
                console.log(err);
            } else {
                res.view({blogs: blogs, user: req.session.user});
            }
        });
        */
        Blog.find({userId : req.session.user.id}).exec(function (err, blogs) {
            if (err) {
                console.log(err);
            } else {
                res.view({blogs: blogs, user: req.session.user});
            }
        });
    },

   add: function (req, res) { 
        res.view();
    },

    create: function (req, res) {
        console.log("blog created");
        Blog.create({
            title: req.body.blogTitle,
            body: req.body.blogBody,
            userId: req.session.user.id
        }, function blogCreated (err, blog){
            if(err) {
                console.log(err);
                req.session.flash = {'message': err};
                res.redirect('/blog');
            }

            req.session.flash = {'message': 'Blog successfully added'};
            res.redirect('/blog');
        });
    },

    edit: function (req, res) {
        console.log("EDIT BLOG");
        Blog.findOne(req.param('id'), function foundBlog (err, blog) {
            console.log(blog);
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                res.view({blog: blog});
            }
        });
    },
    /*
    update: function (req, res) {
        console.log("update bloggg");
        Blog.findOne(req.param('id')).exec(function (err, blog) {
            Blog.update({
                title : req.param.blogTitle,
                body : req.param.blogBody
            }).exec(function (err, blog) {
                if (err) {
                    console.log(err);
                    res.serverError();
                } else {
                    req.session.flash = {'message': 'Successfully updated blog'};
                    res.redirect('/blog');
                }
            });
        });
    },
    */
    update: function (req, res) {
        var id = req.param("id", null);

        Blog.findOne(id).exec(function(err, blog) {
            if (req.method == "POST" && req.param("Blog", null)!=null) {
                var val = req.param("Blog", null);
                blog.title = val.title;
                blog.body = val.body;

                blog.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        req.session.flash = {'message': 'Successfully updated blog'};
                        res.redirect('/blog');       
                    }
                });
            }
        });
    },

    delete: function (req, res) {
        var id = req.param('id', null);

        Blog.findOne(id).exec(function(err, blog) {
            blog.destroy(function(err) {
                res.redirect('/user');
            });
        });
    }  

};