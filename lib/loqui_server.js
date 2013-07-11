var net = require(process.env.NET || 'net'),
  argv = require('optimist').argv,
  multilevel = require(process.env.MULTILEVEL || 'multilevel'),
  level = require(process.env.LEVEL || 'level'),
  hooks = require(process.env.HOOKS || 'level-hooks'),
  util = require('./util');

exports = module.exports = LoquiServer;

function LoquiServer (opts) {
  var levelopts = {
    valueEncoding: argv.valueEncoding || 'json',
    keyEncoding: argv.keyEncoding || 'json',
    encoding: argv.encoding || 'json'
  };

  this.db = level(argv.location || './db', levelopts);

  hooks(this.db);

  this.db.hooks.async({ start: '', end: '~' }, this.getAsyncHook());

  var self = this;
  this.server = net.createServer(function(c) {
    c.pipe(multilevel.server(self.db)).pipe(c);
  });
}

LoquiServer.prototype.listen = function () {
  this.server.listen.apply(this.server,arguments);
}

LoquiServer.prototype.getAsyncHook = function(){
  var self = this;
  return function (op, done) {
    if (op.type === 'put') {
      self.db.get(op.key, self.getDbGetCb(op,done));
    } else {
      done();
    }
  }
}

LoquiServer.prototype.getDbGetCb = function(op,done) {
  var self = this;

  return function(err, value) {
    if (!err) {
      var method = op.value && op.value.method;
      if (method === 'extend' || method === 'counter') {
        op.value = util.merge(op.value, value);
      }
      done({
        type: 'put',
        key: op.key,
        value: op.value
      });
    } else {
      done();
    }
    self.server.emit('log', op);
  }
}
