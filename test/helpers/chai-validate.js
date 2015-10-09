module.exports = function(chai) {
  var Assertion = chai.Assertion;

  Assertion.addMethod("validate", function(attr, rule) {
    var obj = this._obj;
    var result = false;

    if (obj) {
      var error = obj.ValidationError || obj.invalidAttributes || {};
      var attr_errors = error[attr];
      if (attr_errors instanceof Array) {
        for (elem in attr_errors) {
          if (attr_errors[elem].rule == rule) {
            result = true;
            break;
          }
        }
      }
    }

    this.assert(
      true === result
      , "expected #{this} to have '" + rule + "' validation error on '" + attr + "'"
      , "expected #{this} not to have '" + rule + "' validation error on '" + attr + "'"
      );
  });
};

