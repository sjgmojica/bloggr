global.signIn = function (user, done) {
  var fakeAuth = stub(User, "findOne"); // fake query
    fakeAuth.yields(null, user); // check params pass

  function callback(err, success) {
    fakeAuth.restore();
    done(err, success);
  }

  request ? request.post("/login")
    .send(user)
    .end(function (err, result) {
      if (err) {
        callback(err, false);
      } else {
        callback(err, true);
      }
    }) : callback(true, false);
}