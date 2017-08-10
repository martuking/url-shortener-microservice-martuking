var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var dbStructure = require('./db_structure.js');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
mongoose.connect(process.env.MONGO_URI);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/:urlToShorten',function(request,response,next){
  var expression = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi;
  var url = request.params.urlToShorten;
  if(expression.test(url)===true){
    var numero = Math.floor(Math.random()*100000).toString();
    
  }
  response.json({original_url:url,short_url:"url corta"});
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
