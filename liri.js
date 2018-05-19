var dotenv = require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys");


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var args = process.argv;






function myTweets() {
  var params = {screen_name: 'dave_hopi', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.log('Error occurred: ' + error);
      } //else {
        console.log(tweets);
        //console.log(response);
        for (var i = 0; i < tweets.length; i++) {          
          console.log(`------------------------------`);
          console.log(`Dave_Hopi Tweet #${i + 1}`);
          console.log(`Heard at: ${tweets[i].created_at}`);  //"created_at": "Sun Apr 03 23:48:36 +0000 2011", 
          console.log(`${tweets[i].text}`);                  //"text": "RT @PostGradProblem: In preparation for the NFL lockout,...
          console.log(`------------------------------`);
      }
    //}
    });
};

function OMDBSearch(args){

}

function spotifySearch(args) {

}

function readRandom() {

}

function initiate(args) {
  switch (args[2]) {
      case "my-tweets":
          myTweets();
          break;
  /*  case "movie-this":
          OMDBSearch(args);
          break; 
      case "spotify-this-song":
          spotifySearch(args);
          break;
      case "do-what-it-says":
          readRandom();
          break; */
      default:
          console.log("Sorry, wrong input");
  }
}

initiate(args);
 










 /*
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
 */



