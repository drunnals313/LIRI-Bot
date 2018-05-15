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