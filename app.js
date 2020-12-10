var mvc = require("./config/config");


var server=mvc.listen(3000);
var socket = require("./lib/socket");
var io = new socket(server);
