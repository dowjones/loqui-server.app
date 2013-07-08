
var createLevel = function(o) {
  var db = { };
  db.hooks = {                                                                                             
    async: function(o,cb) { this.dbHookCb = cb }
  };
  db.get = function(key,cb){
    cb(null,key + ' teststuff');
  };
  return db;
}

module.exports = createLevel;
