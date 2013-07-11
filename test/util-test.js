var should = require('should')

describe('util testing', function() {

  var moduleUnderTest = '../lib/util'
    , util = require(moduleUnderTest);

  describe('with merge', function() {
    it('should return a', function() {
      var a = {};
      util.merge(a).should.eql(a);
    });
  });

  describe('with merge', function() {
    it('should return a from a,b', function() {
      var a = {method:'put',value:'a'};
      var b = {method:'put',value:'b'};
      var expected = {method:'put',value:'a'};
      util.merge(a,b).should.eql(expected);
    });
  });

  describe('with merge', function() {
    it('should increment count from a,b', function() {
      var a = {method:'counter',value:{counter:1}};
      var b = {method:'counter',value:{counter:1}};
      var expected = { method: 'counter', value: { counter: 2 } };
      util.merge(a,b).should.eql(expected);
    });
  });

});
