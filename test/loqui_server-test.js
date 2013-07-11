var should = require('should')

describe('loqui_server testing', function() {

  var Server
    , moduleUnderTest = '../lib/loqui_server';

  before(function(){
    process.env.NET = '../test/fixtures/net_mock';
    process.env.MULTILEVEL = '../test/fixtures/multilevel_mock';
    process.env.LEVEL = '../test/fixtures/level_mock';
    process.env.HOOKS = '../test/fixtures/level_hooks_mock';
    Server = require(moduleUnderTest);
  });

  describe('with loqui_server', function() {
    it('should construct', function() {
      var server = new Server();
      should.exist(server);
      server.listen.should.be.a('function')
    });
  });

  describe('with asyncHook', function() {
    it('should call db.get', function() {
      var op = {type:'put',key:'testkey',value:'testvalue'};
      var server = new Server();

      server.db = {get:function(key,cb){ 
        key.should.eql(op.key);
        cb.should.be.a('function');
        }
      };
      server.getAsyncHook()(op,function(){});
    });
  });

  describe('with listen', function() {
    it('should listen', function() {
      var server = new Server();
      var port = 9000;
      var expected = port;
      server.server = {listen:function(o){o.should.eql(expected)}};
      server.listen(port);
    });
  });

  describe('with asyncHook', function() {
    it('should done', function() {
      var op = {type:'other',key:'testkey',value:'testvalue'};
      var server = new Server();
      server.getAsyncHook()(op,function(){});
    });
  });

  describe('with getDb', function() {
    it('should handle put op', function() {
      var op = {type:'put',key:'testkey',value:'testvalue'};
      var expected = {
        type: 'put',
        key: op.key,
        value: op.value
      };
      var value = {};
      var server = new Server();
      server.getDbGetCb(op,function(o){o.should.eql(expected)})(null,value);
    });
  });

  describe('with getDb', function() {
    it('should handle err', function() {
      var op = {type:'put',key:'testkey',value:'testvalue'};
      var error = new Error('test error message');
      var server = new Server();
      server.getDbGetCb(op,function(o){should.not.exist(o)})(error);
    });
  });

  describe('with getDb', function() {
    it('should handle extend op', function() {
      var op = {type:'put',key:'testkey',value:{method:'extend'}};
      var expected = { type: 'put', key: 'testkey', value: { method: 'extend' } };
      var value = {};
      var server = new Server();
      server.getDbGetCb(op,function(o){o.should.eql(expected)})(null,value);
    });
  });

});
