require('dotenv').config();
var request = require("request");
var Twitter = require('twitter');
//var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var keys = require("./keys.js");    //should this be ./keys only?
var fs = require('fs');   // do I need this to read the random.txt file later?


var client = new Twitter(keys.twitter);
//var spotify = new Spotify(keys.spotify);

//var args2 = process.argv[2];
//var args3 = process.argv[3];

var searchM = '';

inquirer.prompt([
  {
      name: "choose_command",
      message: "Choose a LIRI command to run.",
      type: "list",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then (function(choiceMade){
  if(choiceMade.choose_command === "my-tweets"){
    var params = {screen_name: 'dave_hopi', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.log('Error occurred: ' + error);
      } 
        for (var i = 0; i < tweets.length; i++) {          
          console.log(`------------------------------`);
          console.log(`Dave_Hopi Tweet #${i + 1}`);
          console.log(`Heard at: ${tweets[i].created_at}`);  //"created_at": "Sun Apr 03 23:48:36 +0000 2011", 
          console.log(`${tweets[i].text}`);                  //"text": "RT @PostGradProblem: In preparation for the NFL lockout,...
          console.log(`------------------------------`);
      }
    });
  }
  else if (choiceMade.choose_command === "spotify-this-song"){
    inquirer.prompt([
        {
            name: "question",
            type: "input",
            message: "Search a song, please:"
        }
    ]).then(function(songSearch){
      if(songSearch != ""){
        spotify.search({
          type: "track",
          query: songSearch,
          limit: 1
      }, function (error, data) {
        if (error) {
            return console.log(`Error: ${error}`);
        }
            console.log(`-----------------------------------`);
            console.log(`Artist Name: ${data.tracks.items.artists[0].name}`);
            console.log(`Song Name: ${data.tracks.items.name}`);
            console.log(`Preview link of the song from Spotify: ${data.tracks.items.external_urls.spotify}`);
            console.log(`Album Name: ${data.tracks.items.album.name}`);
            console.log(`-----------------------------------`);
      } 
    ); 
  } 
      else {
        spotify.search({
          type: "track",
          query: "The Sign",
          limit: 1
      }, function (error, data) {
        if (error) {
            return console.log(`Error: ${error}`);
        }
            console.log(`-----------------------------------`);
            console.log(`Artist Name: ${data.tracks.items.artists[0].name}`);
            console.log(`Song Name: ${data.tracks.items.name}`);
            console.log(`Preview link of the song from Spotify: ${data.tracks.items.external_urls.spotify}`);
            console.log(`Album Name: ${data.tracks.items.album.name}`);
            console.log(`-----------------------------------`);
      } 
    );  
    }
});
}
else if (choiceMade.choose_command === "movie-this"){
  inquirer.prompt([
      {
          name: "question",
          type: "input",
          message: "Search a movie, please:"
      }
  ]).then(function(movieSearch){
      if(movieSearch.question.length>1){
          request("http://www.omdbapi.com/?t=" + movieSearch.question + "&apikey=trilogy", function(error, response, body) {
            console.log("text search instance ran");
            if (error) {
                return console.log(`Error: ${error}`);
            } else {
            console.log(`Movie Title: ${JSON.parse(body).Title}`);
            console.log(`Release Year: ${JSON.parse(body).Year}`);
            console.log(`${JSON.parse(body).Ratings[0].Source} IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
            console.log(`${JSON.parse(body).Ratings[1].Source} Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            }
          });
      }     
      else{
          request("http://www.omdbapi.com/?t=mr%20nobody&apikey=trilogy", function(error, response, body) {

            if (error) {
                return console.log(`Error: ${error}`);
            }
            console.log(`Movie Title: ${JSON.parse(body).Title}`);
            console.log(`Release Year: ${JSON.parse(body).Year}`);
            console.log(`${JSON.parse(body).Ratings[0].Source} IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
            console.log(`${JSON.parse(body).Ratings[1].Source} Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);

          });
      };
  });
}
else if (choiceMade.choose_commande === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Display: ${data}`);
});
}
else {
  return console.log("No choice, no results; sorry!");
};



})


/* function myTweets() {
  var params = {screen_name: 'dave_hopi', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.log('Error occurred: ' + error);
      } //else {
        //console.log(tweets);
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
}; */
 /* 
 function OMDBSearch(args3){
  if (!args3) {
        searchM = "Mr Nobody";
    } else {
        for (var i = 3; i < args.length; i++) {
            if (i > 3 && i < args.length) {
                searchM = searchM + "+" + arg[i];
            } else {
                searchM += input[i];
            }
        }
    }
    var queryUrl =
        "http://www.omdbapi.com/?t=" +
        searchM +
        "&y=&plot=short&apikey=trilogy";  
    request(queryUrl, function (error, response, body) {
        if (error) {
            return console.log(`Error occurred: ${error}`);
        }
        console.log(`Movie Title: ${JSON.parse(body).Title}`);
        console.log(`Release Year: ${JSON.parse(body).Year}`);
        console.log(`${JSON.parse(body).Ratings[0].Source} Rating: ${JSON.parse(body).Ratings[0].Value}`);
        console.log(`${JSON.parse(body).Ratings[1].Source} Rating: ${JSON.parse(body).Ratings[1].Value}`);
        console.log(`Country: ${JSON.parse(body).Country}`);
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
};  

function initiate(args) {
  switch (args[2]) {
      case "my-tweets":
          myTweets();
          break;
      case "movie-this":
          OMDBSearch(args);
          break; 
      case "spotify-this-song":
          spotifySearch(args);
          break;
      case "do-what-it-says":
          readRandom();
          break;  
      default:
          console.log("Sorry, wrong input");
  }
}

initiate(args);
 
 */









 /*
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
 */



