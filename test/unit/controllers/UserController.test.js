// require sails-test-helper
require("sails-test-helper");

describe(TEST_NAME, function() {
  describe("GET index", function() {
    it("should be successful", function(done) {
      request.get("/")
        .expect(200, done);
    });
  });

  describe("POST create", function() {
    it("should be successful creating user", function (done) {
      var user = factory.build("user1");
      request.post("/register")
        .send(user)
        .expect(200)
        .end(function (err, res) {
          expect(res).to.exist;
          expect(err).to.not.exist;
          done();
        });
    });
    it("should be redirect after successful registration", function (done) {
      request.get("/register/success")
        .expect(200, done);
    });
    it("email already exist", function (done) {
      var user = factory.build("user1");
      request.post("/register")
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
/*
  describe("GET index", function() {
    it("should return list of blogs", function (done) {
      request.get("/home")
        
    });
  });
*/
});