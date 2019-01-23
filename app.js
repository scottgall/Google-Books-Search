var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.listen(port, function () {
  console.log(`Google Books Search app listening on port 3000!`);
});