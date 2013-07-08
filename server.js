var server = require('./lib')
  , argv = require('optimist').argv;
server().listen(parseInt(process.env.PORT) || argv.port || 9099);
