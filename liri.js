var env = require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
//var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var keys = require("./keys.js");    //should this be ./keys only?
var fs = require('fs');   // do I need this to read the random.txt file later?

var client = new Twitter(keys.twitter);
//var spotify = new Spotify(keys.spotify);

var args = process.argv;

var searchM = '';
/* inquirer.prompt([
  {
      name: "choose_command",
      message: "Choose a LIRI command to run.",
      type: "list",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then function */


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
/* 
 function OMDBSearch(args){
  if (!args[3]) {
        searchM = "Mr Nobody";
    } else {
        for (var i = 3; i < input.length; i++) {
            if (i > 3 && i < input.length) {
                searchM = searchM + "+" + input[i];
            } else {
                searchM += input[i];
            }
        }
    }
    var queryUrl =
        "http://www.omdbapi.com/?t=" +
        searchM +
        "&y=&plot=short&apikey=9fe10b9b-1053-4bbb-9e13-156d4debb7c0";  //should I be storing my API key in a secure or private location?
    request(queryUrl, function (err, response, body) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        console.log(`Movie Title: ${JSON.parse(body).Title}`);
        console.log(`Release Year: ${JSON.parse(body).Year}`);
        console.log(`${JSON.parse(body).Ratings[0].Source} Rating: ${
        JSON.parse(body).Ratings[0].Value}`);
        console.log(`${JSON.parse(body).Ratings[1].Source} Rating: ${
        JSON.parse(body).Ratings[1].Value}`);
        console.log(`Country Movie was Produced: ${JSON.parse(body).Country}`);
        console.log(`Language: ${JSON.parse(body).Language}`);
        console.log(`Actors: ${JSON.parse(body).Actors}`);
        console.log(`Plot: ${JSON.parse(body).Plot}`);
    });
}

function spotifySearch(args) {

}

function readRandom() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (err) {
        return console.log(`Error occurred: ${error}`);
    }
    console.log(`Executing: ${data}`);
})
};  */

function initiate(args) {
  switch (args[2]) {
      case "my-tweets":
          myTweets();
          break;
/*       case "movie-this":
          OMDBSearch(args);
          break; 
      case "spotify-this-song":
          spotifySearch(args);
          break;
      case "do-what-it-says":
          readRandom();
          break;  */
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



