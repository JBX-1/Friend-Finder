// requires data from friends api file
var friends = require("../data/friends.js");

module.exports = function(app) {
    // get the api requests
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });
    // posting api requests
    app.post("/api/friends", function(req, res){

        // hold the user choice's
        var cupidChoice = {
            name: "",
            photo: "",
            difference: 1000
        };
        // parse & holds the user results 
        var userInfo = req.body;
        var nameOfUser = userInfo.name;
        var photoOfUser = userInfo.photo;
        var scoreOfUser = userInfo.scores;
        // calculates the scores differences between the users
        var userDifference = 0;

        //loops through all the possibilities
        for (var i = 0; i < friends.length; i++) {

            // console.log(friends[i].name);
            userDifference = 0;

            //hard loop friends scores
            for (var j = 0; j< friends[i].scores[j]; j++) {
                //adds up each sums betweens both and gives a score
                userDifference += Math.abs(parseInt(scoreOfUser[j]) - parseInt(friends[i].scores[j]));

                //if the sum is less then the cupidchoice
                if (userDifference <= cupidChoice.difference) {
                    //this resets cupidchoice
                    cupidChoice.name = friends[i].name;
                    cupidChoice.photo = friends[i].photo;
                    cupidChoice.difference = userDifference;
                }
            }

        }
        console.log(cupidChoice);
        //this returns json with user's cupidchoice
        res.json(cupidChoice);
        // save the user to database
        friends.push(userInfo);


    })
}