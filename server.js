var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/new/:urlToShorten',function(request,response,next){
  var url = request.params.urlToShorten;
  response.send("esta funcionando y esta es tu url:"+url);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
