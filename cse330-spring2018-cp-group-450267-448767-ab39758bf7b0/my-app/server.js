
//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Review = require('./model/reviews');
var User = require('./model/users');
//and create our instances
var app = express();
var router = express.Router();
var xssFilters = require('xss-filters');
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://reviewUser:user@ds251889.mlab.com:51889/coursereviews');

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/reviews')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Comment Schema
 Review.find({}).sort({course: 'asc'}).exec(function(err, reviews) {
 if (err)
 res.send( xssFilters.inHTMLData(err));
 //responds with a json object of our database comments.
 res.json(reviews)

 });
 })
 //post new comment to the database
 .post(function(req, res) {
 var review = new Review();
 //body parser lets us use the req.body
 review.school = req.body.school; //FIX ME
 review.deptNum = req.body.deptNum;
 review.dept = req.body.dept;
 review.course = req.body.course;
 review.review = req.body.review;
 review.prof = req.body.prof;
 review.tag = req.body.tag;
 review.user = req.body.user;
 review.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'Review successfully added!' });
 });
 });


//server.js
//Add this after our get and post routes
//Adding a route to a specific comments based on the database ID
router.route('/reviews/:review_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
 .put(function(req, res) {
   Review.findById(req.params.review_id, function(err, review) {
     if (err)
       res.send(err);
     //setting the new author and text to whatever was changed. If nothing was changed
     // we will not alter the field.
 (req.body.school) ? review.school = req.body.school : null;
 (req.body.deptNum) ? review.deptNum = req.body.deptNum : null;
 (req.body.dept) ? review.dept = req.body.dept : null;
 (req.body.course) ? review.course = req.body.course : null;
 (req.body.review) ? review.review = req.body.review : null;
 (req.body.prof) ? review.prof = req.body.prof : null;
 (req.body.tag) ? review.tag = req.body.tag : null;
 (req.body.user) ? review.user = req.body.user : null;
     //save comment
     review.save(function(err) {
       if (err)
         res.send(err);
       res.json({ message: 'Review has been updated' });
     });
   });
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
   //selects the comment by its ID, then removes it.
   Review.remove({ _id: req.params.review_id }, function(err, review) {
     if (err)
       res.send(err);
     res.json({ message: 'Review has been deleted' })
   })
 });




router.route('/users')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Comment Schema
 User.find(function(err, users) {
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(users)
 });
 })
 //post new comment to the database
 .post(function(req, res) {
 var user = new User();
 //body parser lets us use the req.body
 user.username = req.body.username; //FIX ME
 user.password = req.body.password;
user.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'User successfully added!' });
 });
 });


//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});