require("dotenv").config();



//Add the code required to import the `keys.js` file and store it in a variable.
  
// You should then be able to access your keys information like so

 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

/* 10. Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says` */


var Twitter = require('twitter');

var client = new Twitter({
  TWITTER_CONSUMER_KEY= "SWshNFKhS289Sr0ei2teSJM3y",
  TWITTER_CONSUMER_SECRET="l9UHKZTnY6TMxoE1Xn4dkA9wmShz62f71GcbBXdJB17UDZYDCF",
  TWITTER_ACCESS_TOKEN_KEY= "996206395421790208-8jDkyanhbgH3mpnNPIlU69djAzZebLK",
  TWITTER_ACCESS_TOKEN_SECRET= "tvnEt3r7nGeAgHMtf7DGt0Q8e8p9lbeHVrREZAuiqc8mj"
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


var spotify = new Twitter({
  Client_ID = "4918133e2a2f46cf80a3e7be1d92e99f",
  Client_Secret = "dc81e55ec6064637a97b4711af88824d"
});

//Client ID = 4918133e2a2f46cf80a3e7be1d92e99f

//Client Secret = dc81e55ec6064637a97b4711af88824d