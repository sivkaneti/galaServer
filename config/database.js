const mongoose = require('mongoose');

var mongooseDB = 'mongodb://localhost:27017/gala-server';
mongoose.connect(mongooseDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',function (err) {
  console.log(`------- Mongoose connection error: ${err} -------`);
});
db.on('connected',function () {
  console.log(`------- Mongoose connection open to: ${mongooseDB} -------`);
});
db.on('disconnected',function () {
  console.log(`------- Mongoose connection disconnected -------`);
});
// db.openUri(mongooseDB, { /* options */ });

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log(`------- Mongoose connection disconnected through app termination -------`);
    process.exit(0);
  });
});


var Url  ;
function createDefaultSchema(){
  console.log("------- Create new Default Schema -------")
  var urlSchema = mongoose.Schema({
      Url :{ name: String }
  });
  Url = mongoose.model('url', urlSchema);
}

function createDefaultUrl(){
  if(true){
    //create default url - > http://www.galaprompter.com/ first time (when application is loaded)
    var urlDoc = new Url({ Url: { name : 'http://www.galaprompter.com/' }});
    urlDoc.save(function (err) {
      if (err) return handleError(err);
    });
  }
}

function findUrl(callback){
 Url.find({ Url: { $exists: true }})
   .then((urls) => {
        if(urls.length > 0){
          callback(null, urls[0].Url.name);
        }else{
          callback("NO URL FOUND");
        }
    }).catch((err) => {
        callback(err);
    });
}

createDefaultSchema();
createDefaultUrl();

module.exports = {
  findUrl
};
