require("sails-test-helper");

describe(TEST_NAME, function() {

  // -- title
  describe("title validation", function() {
    describe("#title", function() {
      it("should be a valid title", function(done) {
        Blog.create({}, function(err, blog) {
          expect(blog).to.not.exist;
          expect(err).to.exist;
          expect(err).to.validate("title", "required");
          done();
        });
      });
    });
  });

  // -- body
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
      
      it("should be a valid body if not required", function(done) {
        Blog.create({}, function(err, blog) {
          expect(blog).to.not.exist;
          expect(err).to.exist;
          //expect(err).to.validate("body", "required");
          done();
        });
      });
    });
  });

  // -- date and time
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

  // -- userid
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

  // -- insert blog
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