require("dotenv").config();
var fs = require("fs");

var keys = require('../liri-node-app/keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var twitter = keys.twitter;
var twitterclient = new Twitter(twitter);


fs.readFile("keys.js", "utf8", function(error, data) { if (error) {
    return console.log(error);
}
console.log(data);

var dataArr = data;
 // console.log(dataArr);

});
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

