require('dotenv').config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var keys = require("./keys.js");    
var fs = require('fs');  

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

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
              message: "Search a song, please (or hit enter for default of The Sign):"
          }
      ]).then(function(songSearch){
        if(songSearch.question.length>1){                       //still not getting relevant spotify search results back   need to find the correct parameter maybe
          spotify.search({
            type: "track",
            query: songSearch.question,
            limit: 1
        }, function (error, data) {
          if (error) {
              return console.log(`Error1: ${error}`);
          } else {
              console.log(`-----------------------------------`);
              console.log(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
              console.log(`Song Name: ${data.tracks.items[0].name}`);
              console.log(`Preview link of the song from Spotify: ${data.tracks.items[0].external_urls.spotify}`);
              console.log(`Album Name: ${data.tracks.items[0].album.name}`);
              console.log(`-----------------------------------`);
          }
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
              return console.log(`Error2: ${error}`);
          }
              console.log(`-----------------------------------`);
              console.log(`Artist Name: ${data.tracks.items[0].artists.name}`);
              console.log(`Song Name: ${data.tracks.items[0].name}`);
              console.log(`Preview link of the song from Spotify: ${data.tracks.items[0].external_urls.spotify}`);
              console.log(`Album Name: ${data.tracks.items[0].album.name}`);
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
            message: "Search a movie, please (or hit enter for default of Mr Nobody):"
        }
    ]).then(function(movieSearch){
        if(movieSearch.question.length>0){
            request("http://www.omdbapi.com/?t=" + movieSearch.question + "&apikey=trilogy", function(error, response, body) {
              if (error) {
                  return console.log(`Error: ${error}`);
              } else {
              console.log(`Movie Title: ${JSON.parse(body).Title}`);
              console.log(`Release Year: ${JSON.parse(body).Year}`);
              console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
              console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
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
              console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
              console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
              console.log(`Country: ${JSON.parse(body).Country}`);
              console.log(`Language: ${JSON.parse(body).Language}`);
              console.log(`Actors: ${JSON.parse(body).Actors}`);
              console.log(`Plot: ${JSON.parse(body).Plot}`);

            });
        };
    });
  }
  else if (choiceMade.choose_command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
          return console.log(`Error: ${error}`);
      }
          spotify.search({
            type: "track",
            query: data,
            limit: 1
        }, function (error, data) {
          if (error) {
              return console.log(`Error: ${error}`);
          } else {
              console.log(`-----------------------------------`);
              console.log(`Artist Name: ${data.tracks.items[0].artists.name}`);
              console.log(`Song Name: ${data.tracks.items[0].name}`);
              console.log(`Preview link of the song from Spotify: ${data.tracks.items[0].external_urls.spotify}`);
              console.log(`Album Name: ${data.tracks.items[0].album.name}`);
              console.log(`-----------------------------------`);
            }
          } 
          ); 

    });
  }
  else {
    return console.log("No choice, no results; sorry!");
  };



})



