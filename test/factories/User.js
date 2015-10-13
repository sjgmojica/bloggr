module.exports = function (factory) {
  factory.define("user1")
    .attr("id", 0, {auto_increment: true})
    .attr("email", "sa@chikka.com")
    .attr("password", "123456")
    .attr("firstname", "zah")
    .attr("lastname", "mojica")
    .attr("desc", "photography")
    .attr("join_dt", "October-12-2015")
    .attr("join_tm", "01:40:10");

  factory.define("active_user").parent("user1")
    .attr("email", "sj@chikka.com")
    .attr("firstname", "");

  factory.define("active_user1").parent("user1")
    .attr("email", "s@chikka.com")
    .attr("lastname", "");

  factory.define("active_user2").parent("user1")
    .attr("email", "se@chikka.com")
    .attr("desc", "");
}