
var op = {type:'put',key:'testkey',value:'testvalue'};

var done = function(o){console.log(o)}

var createLevel = function(o) {
  var db = { };
  db.hooks = {
    async: function(o,cb) { 
console.log("ASYNC");
      cb(op,done);
    }
  };
  db.get = function(key,cb){
    cb(null,key + ' teststuff');
  };
  return db;
}

module.exports = createLevel;
