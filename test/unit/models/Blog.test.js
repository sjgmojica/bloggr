require("sails-test-helper");

describe(TEST_NAME, function() {
  describe("title validation", function() {
    describe("#title", function() {
      it("should be a valid title", function(done) {
        Blog.create({}, function(err, blog) {
            expect(blog).to.not.exist;
            expect(err).to.exist;
            expect(err).to.validate("title", "required");
            done();
        });
      })
    });
  });
});

describe(TEST_NAME, function() {
  describe("blog body validation", function() {
    describe("#body", function() {
      it("should be a valid body", function(done) {
        Blog.create({}, function(err, blog) {
          expect(blog).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("body", "required");
          done();
        });
      });
    });
  });
});

describe(TEST_NAME, function() {
  describe("date and time validation", function() {
    describe("#dt_post", function() {
      it("should be a valid date and time", function(done) {
        Blog.create({}, function(err, blog) {
            expect(blog).to.not.exist;
            expect(err).to.exist;
            expect(err).to.validate("dt_post", "required");
          done();
        });
      });
    });
  });
});

describe(TEST_NAME, function() {
  describe("userid validation", function() {
    describe("#userId", function() {
      it("should be a valid userId", function(done){
        Blog.create({}, function(err, blog) {
          expect(blog).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("userId", "required");
          done();
        });
      });
    });
  });
});

describe(TEST_NAME, function() {
  describe("create blog", function() {
    describe(".create()", function() {
      it("should be successful", function(done) {
        Blog.create({title: "test blog", body: "test body", dt_post: "Fri 2015-Oct-09 06:44:10 pm", userId: "QWERTY123456789"}, function(err, blog) {
          expect(err).to.not.exist;
          expect(blog).to.exist;
          done();
        })
      });
    });
  });
});