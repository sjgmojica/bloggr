// require sails-test-helper
require("sails-test-helper");

describe(TEST_NAME, function() {
  describe("GET index", function() {
    it("should be successful", function(done) {
      request.get("/")
        .expect(200)
        .end(done);
    });
  });
});
