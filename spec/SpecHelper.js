beforeEach(function() {
  this.addMatchers({

    toMatch: function(expected) {
      var regExp = typeof expected == 'object' &&
          expected.constructor.name == 'RegExp' ?
          expected : new RegExp(expected);
      return regExp.test(this.actual);
    }

  });
});
