var express = require("express");
var routes = require("./routes")
var session = require('express-session')
var bodyParser = require("body-parser");
var app = express();






var fileUpload = require("express-fileupload");
app.set("views", "./views");
app.set("view engine", "ejs");


app.use(express.static("./public"))//href="./public/css/style.css"

app.use(fileUpload());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true, 
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.all("*", function(req,res){
	let current = req.url;
	if(current.indexOf("?")!=-1){
		current = current.substring(0,current.indexOf("?"));
	}
	let elm = routes.find(y => y.key == current && y.type == req.method);
	if(elm){
		let controller = require("../controllers/"+elm.controller);

		let obj = new controller();
		obj[elm.method].call(null,req,res)
	}else{
		res.render("error")
	}
})
module.exports = app;