var dotenv = require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
//var Spotify = require('node-spotify-api');
var keys = require("./keys");


var client = new Twitter(keys.twitter);
//var spotify = new Spotify(keys.spotify);

var args = process.argv;
var inputVar = ""; 


/* var client = new Twitter({
  TWITTER_CONSUMER_KEY= "SWshNFKhS289Sr0ei2teSJM3y",
  TWITTER_CONSUMER_SECRET="l9UHKZTnY6TMxoE1Xn4dkA9wmShz62f71GcbBXdJB17UDZYDCF",
  TWITTER_ACCESS_TOKEN_KEY= "996206395421790208-8jDkyanhbgH3mpnNPIlU69djAzZebLK",
  TWITTER_ACCESS_TOKEN_SECRET= "tvnEt3r7nGeAgHMtf7DGt0Q8e8p9lbeHVrREZAuiqc8mj"
}); */


function myTweets() {
  var params = {screen_name: 'dave_hopi', count: 20, extended: true};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      } else {
        console.log('Error occurred: ' + error);
      }
    });
};

myTweets();

 
/* var spotify = new Spotify({
  id: "4918133e2a2f46cf80a3e7be1d92e99f",
  secret: "dc81e55ec6064637a97b4711af88824d"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
 */




//Client ID = 4918133e2a2f46cf80a3e7be1d92e99f

//Client Secret = dc81e55ec6064637a97b4711af88824d

//http://www.omdbapi.com/?i=tt3896198&apikey=8192bdca


