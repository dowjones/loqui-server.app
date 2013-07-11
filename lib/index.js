var LoquiServer = require('./loqui_server');

exports = module.exports = createServer;                                                           

function createServer (opts) {
//  var server = {};
//  var loquiServer = new LoquiServer(opts);
//  server.listen = loquiServer.listen;
//  return server;
  return new LoquiServer(opts);
}
