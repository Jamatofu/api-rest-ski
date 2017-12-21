var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");
  

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(function(req, res, next) {
	if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
		jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIS', function(err, decode) {
			if(err) req.member = undefined;
			req.user = decode;
			next();
		});
	} else {
		req.user = undefined;
		next();	
	}
});

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);