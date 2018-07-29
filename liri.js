require("dotenv").config();
var fs = require("fs");

var keys = require('../liri-node-app/keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var twitterKeys = keys.twitter;

var spot = (name) => {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: name.replace(' ', '-'), limit: 2}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
                
        console.log("'" + name + "'");
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
      });
    }


var meTweets = ()=>{
var client = new Twitter(twitterKeys);
   
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, json) {
    if (!error) {
      var tweets= json;
      tweets.forEach(ele => {
         console.log(ele.text+"\n");
         
      });
    }
  });
}




if (process.argv[2] == 'my-Tweets') {
    meTweets();
    
}else if(process.argv[2] == 'spotify-this-song'){
    spot(process.argv[3]);

}