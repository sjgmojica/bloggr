
module.exports.routes = {
  /* == index, signup, login ==*/
  "get /"                   : { view: "index" },
  //"get /register"           : "UserController.signup",
  //"get /login"              : "UserController.login",
  "get /register/success"   : { view: "user/success"},
  "post /register"          : "UserController.create",
  "post /login"             : "UserController.processLogin",
  "get /user/edit/:id"      : "UserController.edit",
  "put /user/update/:id"    : "UserController.update",
  "get /home"               : "UserController.index",
  "get /logout"             : "UserController.logout",

 /* == blog ==*/
  //"get /blog/add"           : "BlogController.add",
  "post /blog/create"       : "BlogController.create",
  "get /blog/edit/:id"      : "BlogController.edit",
  "put /blog/update/:id"    : "BlogController.update",
  "delete /blog/delete/:id" : "BlogController.delete",
  "get /blog"               : "BlogController.index",
};
