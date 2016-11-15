var Express = require('express');
var app = Express();
var path = require('path');

var port = 5000;
app.use('/static', Express.static(__dirname + '/static'));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/main.html'));  
});

app.listen(port);