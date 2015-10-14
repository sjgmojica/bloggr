require("sails-test-helper");

describe(TEST_NAME, function() {
  
  var user = {
    id : 1,
    email : "sa@chikka.com",
    password : "123456",
    firstname: "zah",
    lastname: "mojica",
    desc: "photography"
  }

  before(function(done) {
    signIn(user, done);
  });
  
  // -- new blog
  describe("POST create", function() {
    it("should be successful in creating new blog", function (done) {
      var blog = factory.build("blog1");
      request.post("/blog/create")
        .send(blog)
        .expect(302)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.headers.location).to.be.eq("/blog");
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
     
    it("should be error in creating new blog", function (done) {
      var blog = factory.build("blog2");
      request.post("/blog/create")
        .send(blog)
        .expect(302)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.headers.location).to.be.eq("/blog");
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

  // -- get index/ user profile page
  describe("GET index", function() {
    it("should be successful", function (done) {
      request.get("/blog")
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

  // -- edit blog
  describe("GET edit", function() {
    it("should render blog edit page with data", function (done) {
       var blog = factory.build("blog1");
      request.get("/blog/edit/"+blog.id)
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

  // -- update blog
  describe("PUT update", function() {
    it("should be successful updating of blog", function (done) {
      var blog = factory.build("blog3");
      request.put("/blog/update/"+blog.id)
        .set("ACCEPT", "application/json")
        .send(blog)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

  // -- delete blog
  describe("DELETE delete", function() {
    it("should be successful deleting of blog", function (done) {
      var blog = factory.build("blog1");
      request.delete("/blog/delete/"+blog.id)
        .expect(302)
        .send(blog)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.headers.location).to.be.eq("/user");
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

  // -- logout
  describe("GET logout", function() {
    it("should be successful logout", function (done) {
      request.get("/logout")
        .expect(302)
        .end(function (err, res) {
          expect(err).not.to.exist;
          expect(res).to.exist;
          expect(res.header.location).to.be.eq("/");
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });

});
