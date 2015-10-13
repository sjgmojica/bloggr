module.exports = function (factory) {
  factory.define("blog1")
    .attr("id", 0, {auto_increment:true})
    .attr("title", "blog test")
    .attr("body", "blog body")
    .attr("dt_post", "Mon 2015-10-12 01:47:10 pm")
    .attr("userId", "1")

  factory.define("blog2")
    .attr("id", 0, {auto_increment:true})
    .attr("title", "blog test2")
    .attr("body", "blog body2")
    .attr("dt_post", "Mon 2015-10-12 01:50:10 pm")
    .attr("userId", "2")

  factory.define("blog2")
    .attr("id", 0, {auto_increment:true})
    .attr("title", "blog test2")
    .attr("body", "blog body2")
    .attr("dt_post", "Mon 2015-10-12 01:50:10 pm")
    .attr("userId", "3")
}