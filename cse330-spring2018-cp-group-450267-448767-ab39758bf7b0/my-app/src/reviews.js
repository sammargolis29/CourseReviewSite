//model/reviews.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var reviewsSchema = new Schema({
 school: String,
 deptNum: String,
 dept: String,
 course: String,
 review: String
});
//export our module to use in server.js
module.exports = mongoose.model('Review', reviewsSchema);


// school: "Art", deptNum: 5, dept: "Fashion", course: "Intro to Design", review: "alright"},