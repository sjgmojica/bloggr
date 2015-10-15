module.exports = function (factory) {
  factory.define("blog1")
    .attr("id", 1)
    .attr("blogTitle", "blog test")
    .attr("blogBody", "blog body");

  factory.define("blog2")
    .attr("id", 2)
    .attr("blogTitle", "update blog title")
    .attr("blogBody", "update blog body");

  factory.define("blog3")
    .attr("id", 1)
    .attr("blogTitle", "")
    .attr("blogBody", "blog body3");
}