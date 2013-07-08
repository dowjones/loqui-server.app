var connection = {
  pipe:function(){return this}
}

exports.createServer = function(cb) {
  var server = { };
  server.listen = function(port){ };
  server.emit = function(s,op){ };
  server.cb = cb;
  server.cb(connection);
  return server;
}
