// require sails-test-helper
require("sails-test-helper");

describe(TEST_NAME, function() {
  // -- main page
  describe("GET index", function() {
    it("should render main page", function(done) {
      request.get("/")
        .expect(200)
        .end(function (err, res) {
          expect(err).not.to.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
  });
  
  // -- signup/registration
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

    it("should be redirect after successful registration", function (done) {
      request.get("/register/success")
        .expect(200)
        .end(function (err, res) {
          expect(err).not.to.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
    it("email already exist", function (done) {
      var user = factory.build("user1");
      request.post("/register")
        .set("ACCEPT", "application/json")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.body.error).to.be.eq(true);
          done();
        });
    });
    it("should be error if no fname", function (done) {
      var activeUser = factory.build("active_user")
      request.post("/register")
        .send(activeUser)
        .expect(500)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.body.error).to.be.eq("E_VALIDATION");
          done();
        });
    });
    it("should be error if no lname", function (done) {
      var activeUser1 = factory.build("active_user1");
      request.post("/register")
        .send(activeUser1)
        .expect(500)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.body.error).to.be.eq("E_VALIDATION");
          done();
        });
    });
    it("should be error if no desc", function (done) {
      var activeUser2 = factory.build("active_user2");
      request.post("/register")
        .send(activeUser2)
        .expect(500)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.body.error).to.be.eq("E_VALIDATION");
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
          expect(res.headers.location).to.be.eq("/home");
          expect(res.redirect).to.be.eq(true);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
    it("should be error if user or password did not exist", function (done) {
      var params = {
        email: "sm@chikka.com",
        password: "123456"
      }
      request.post("/login")
        .send(params)
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.body.error).to.be.eq(true);
          done();
        });
    });
  });

  // -- homepage after successful login
  describe("GET index", function() {
    it("should render homepage with lists of blogs", function (done) {
      request.get("/home")
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

  // -- edit profile
  describe("GET edit", function() {
    it("should render profile edit page with data", function (done) {
      var user = factory.build("user1");
      request.get("/user/edit/"+user.id)
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

  // -- update profile
  describe("PUT update", function() {
    it("should be successful updating user profile", function (done) {
      var user = factory.build("active_user3");
      request.put("/user/update/"+user.id)
        .set("ACCEPT", "application/json")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
          expect(res.clientError).to.be.eq(false);
          done();
        });
    });
    
    it("should be error in updating user profile", function (done) {
      var user = factory.build("active_user1");
      request.put("/user/update/"+user.id)
        .set("ACCEPT", "application/json")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          //console.log(res);
          console.log(res.body.message);
          expect(err).to.not.exist;
          expect(res).to.exist;
          expect(res.redirect).to.be.eq(false);
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