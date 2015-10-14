module.exports = function (factory) {
  factory.define("blog1")
    .attr("id", 1)
    .attr("blogTitle", "blog test")
    .attr("blogBody", "blog body");

  factory.define("blog2")
    .attr("id", 2)
    //.attr("blogTitle", "blog test2")
    .attr("blogBody", "blog body2");

  factory.define("blog3")
    .attr("id", 1)
    .attr("blogTitle", "blog update test")
    .attr("blogBody", "blog update body");
}