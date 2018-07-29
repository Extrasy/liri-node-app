require("dotenv").config();
var fs = require("fs");

var keys = require('../liri-node-app/keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var twitterKeys = keys.twitter;
var request = require('request');

var spot = (name) => {

    if (!name) {
        name = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: name, limit: 2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("'" + name + "'");
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
    });
}


var meTweets = () => {
    var client = new Twitter(twitterKeys);

    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, json) {
        if (!error) {
            var tweets = json;
            tweets.forEach(ele => {
                console.log(ele.text + "\n");

            });
        }
    });
}

var movieTime = (movie) => {

    if (!movie) {
        movie = "Mr Nobody";
    }
    var ombdClient = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(ombdClient, function (err, res, body) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            let jsonData = JSON.parse(body);

            console.log("'" + movie + "'");
            console.log(jsonData.Year);
            console.log(jsonData.imdbRating);
            console.log(jsonData.Ratings[1].Value);
            console.log(jsonData.Language);
            console.log(jsonData.Actors);
            console.log(jsonData.Plot);


            /* * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.
         */
        }
    });
}



if (process.argv[2] == 'my-Tweets') {
    meTweets();

} else if (process.argv[2] == 'spotify-this-song') {
    spot(process.argv[3]);

} else if (process.argv[2] == 'movie-this') {
    movieTime(process.argv[3]);

}
