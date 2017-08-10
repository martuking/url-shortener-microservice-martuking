var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var urlSchema = new Schema(
  {
    originalUrl: String,
    shortUrl: String
  },
  { timestap: true }
);
var ModelClass = mongoose.model('structure',urlSchema);
module.exports = ModelClass;