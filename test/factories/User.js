module.exports = function (factory) {
  factory.define("user1")
    .attr("id", 1)
    .attr("email", "sa@chikka.com")
    .attr("password", "123456")
    .attr("firstname", "zah")
    .attr("lastname", "mojica")
    .attr("desc", "photography");
    
  factory.define("active_user").parent("user1")
    .attr("id", 2)
    .attr("email", "sj@chikka.com")
    .attr("firstname", "");

  factory.define("active_user1").parent("user1")
    .attr("id", 3)
    .attr("email", "s@chikka.com")
    .attr("lastname", "");

  factory.define("active_user2").parent("user1")
    .attr("id", 4)
    .attr("email", "se@chikka.com")
    .attr("desc", "");

  factory.define("active_user3").parent("user1")
    .attr("firstname", "sarz")
    .attr("desc", "sample desc");
}