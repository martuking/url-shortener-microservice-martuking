var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var db = require('./db_structure.js');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
mongoose.connect(process.env.MONGO_URI);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get("/:urlToShorten", function(request, response, next) {
  var expression = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi;
  var original = request.params.urlToShorten;
  if (expression.test(original) === true) {
    var numero = Math.floor(Math.random() * 100000).toString();
    var data = new db({
      originalUrl: original,
      shortUrl: numero
    });
    data.save(function(err) {
      if (err) {
        return response.send(
          "An error occurred while saving data in the database"
        );
      }
    });
    //return de date with it's correct format
    return response.json({data});
  } else {
    return response.send("write an existing url of a real website");
  }
});
app.get("/:urlToForward", function(request, response, next) {
  var corto = request.params.urlToForward;
  db.findOne({ shortUrl: corto }, function(err, data) {
    if (err) {
      return response.send("no such shortUrl in the database");
    }
    var re = new RegExp("^(http||https)://", "i");
    var strToCheck = data.originalUrl;
    if (re.test(strToCheck)) {
      response.redirect(301, data.originalUrl);
    }
    else {
      response.redirect(301,'https://');
    }
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
