var express = require('express');
var app = express();

app.use(express.static(__dirname + '/.tmp/public'));

app.listen(process.env.PORT || 3000);
