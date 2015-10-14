require("sails-test-helper");

describe(TEST_NAME, function() {

  // -- signup
  describe("POST create", function() {
    it("should be successful in creating user", function (done) {
      var user = factory.build("user1");
      request.post("/register")
        .set("ACCEPT", "application/json")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          done();
        });
    });
  });

  // -- login
  describe("POST processLogin", function() {
    it("should be successful login", function (done) {
      var user = factory.build("user1");
      request.post("/login")
        .send(user)
        .expect(302)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
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

});
