var should = require('should')

describe('index testing', function() {

  var server
    , moduleUnderTest = '../lib/index';

  describe('with service', function() {

    process.env.NET = '../test/fixtures/net_mock';
    process.env.MULTILEVEL = '../test/fixtures/multilevel_mock';
    process.env.LEVEL = '../test/fixtures/level_mock';
    process.env.HOOKS = '../test/fixtures/level_hooks_mock';

    server = require(moduleUnderTest);

    it('should construct', function() {
      var service = server();
      should.exist(service);
      service.listen.should.be.a('function')
    });
  });

});
