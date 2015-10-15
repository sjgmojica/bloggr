require("sails-test-helper");

describe(TEST_NAME, function() {
  describe("validation", function() {
    describe("#email", function() {
      it("should be a valid email address", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          done();
        });
      });
    });
  });

  // -- email
  describe("email validation", function() {
    describe("#email", function() {
      it("should be a valid email address", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.have.deep.property("invalidAttributes.email")
            .that.is.an("array")
            .that.satisfy(function(rules) {
              return _.find(rules, {rule: "email"});
            });
          done();
        });
      });

      it("is required", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.have.deep.property("invalidAttributes.email")
            .that.is.an("array")
            .that.satisfy(function(rules) {
              return _.find(rules, {rule: "required"});
            });
          done();
        });
      });
      it("is valid email", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("email", "required");
          done();
        });
      });
    });
  });

  // -- password
  describe("password validation", function() {
    describe("#password", function() {
      it("should be a valid password", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.have.deep.property("invalidAttributes.password")
            .that.is.an("array")
            .that.satisfy(function(rules) {
              return _.find(rules, {rule: "string"});
            });
          done();
        });
      });
      it("is required", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.have.deep.property("invalidAttributes.password")
            .that.is.an("array")
            .that.satisfy(function(rules) {
              return _.find(rules, {rule: "required"});
            });
          done();
        });
      });
      it("is valid password", function(done) {
        User.create({}, function(err,user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("password", "required");
          done();
        });
      });
    });
  });

  // -- firstname
  describe("firstname validation", function() {
    describe("#firstname", function() {
      it("should be a valid firstname", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("firstname", "required");
          done();
        });
      });
    });
  });

  // -- lastname
  describe("Lastname validation", function() {
    describe("#lastname", function() {
      it("should be a valid lastname", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("lastname", "required");
          done();
        });
      });
    });
  });
  
  // -- description
  describe("Desc validation", function() {
    describe("#desc", function() {
      it("should be a valid desc", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("desc", "required");
          done();
        });
      });
    });
  });

  // -- date
  describe("date validation", function() {
    describe("#join_dt", function() {
      it("should be a valid date", function(done) {
        User.create({}, function(err, user) {
          expect(user).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("join_dt", "required");
          done();
        });
      });
    });
  });

  // -- time
  describe("time validation", function() {
    describe("#join_tm", function() {
      it("should be a valid time", function(done) {
        User.create({}, function(err, user) {
          expect(user).not.to.exist;
          expect(err).to.exist;
          expect(err).to.validate("join_tm", "required");
          done();
        });
      });
    });
  });

  // -- create user
  describe("create user", function(){
     describe(".create()", function() {
      it("should be successful", function(done) {
        User.create({email: "user@abc.com", password: "test123", firstname: "sarah", lastname: "mojica", desc: "food lover", join_dt: "October-09-2015", join_tm: "05:48:10"}, function(err, user) {
          expect(err).to.not.exist;
          expect(user).to.exist;
          done();
        })
      });
    });
  });

  /* scenario: Sample duplicate entry
  catch error: 1) User create user .create() should be successful 2:
     Uncaught AssertionError: expected { Object (code, invalidAttributes, ...) } to not exist
  */
  describe("create user", function(){
     describe(".create()", function() {
      it("should be successful 2", function(done) {
        User.create({email: "user@abc.com", password: "test123", firstname: "sarah", lastname: "mojica", desc: "food lover", join_dt: "October-09-2015", join_tm: "05:48:10"}, function(err, user) {
          expect(err).to.not.exist;
          expect(user).to.exist;
          done();
        })
      });
    });
  });

});