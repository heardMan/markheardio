var express = require("express");
var path  =  require("path");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log(`Server now listening on port: ${PORT}`);
})