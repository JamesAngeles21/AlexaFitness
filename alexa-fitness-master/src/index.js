'use strict';
var list = require('./call');
var myObj;
 list.getWorkouts().then(entities=> {    
      myObj = entities;

      console.log("INDEX.JS -------");
      console.log(myObj);

      console.log("SORTED----------------");
      myObj = sortByDay(myObj);
      console.log(myObj);

      console.log("MAX DAYS: "+getMaxDays(myObj));

      for(var r=0;r<myObj.length;r++){
          console.log(exerciseStringify(myObj[r]));
      }
      console.log("---------------");
      var t = populateExercise(myObj);

      for(var e=0;e<t.length;e++){
          console.log(t[e]);
      }

      console.log("JSON: "+makeJsonWithList(myObj));

});

function exerciseStringify(jsonObj){
    if(jsonObj.Type == 10004){
        var exercise = jsonObj.Name;
        var day = jsonObj.Profiles[0].Integers[0]
        var reps = jsonObj.Profiles[0].Integers[1]
        var sets = jsonObj.Profiles[0].Integers[2]

        return exercise + " for " + reps + " repetitions " + sets + " sets"; 
    }
    else{
        var exercise = jsonObj.Name;
        var day = jsonObj.Profiles[0].Integers[0]
        var time = jsonObj.Profiles[0].Integers[1]

        return exercise + " for " + time + " seconds"; 
    }
}

function getMaxDays(jsonList){
    if(jsonList < 1){
        return 0;
    }

    var max = jsonList[0].Profiles[0].Integers[0]

    for(var x=1;x<jsonList.length;x++){
        var curr = jsonList[x].Profiles[0].Integers[0];

        if(curr>max){
            max = curr;
        }
    }

    return max;
}

function sortByDay(jsonList){
    for(var i=0;i<jsonList.length;i++){
        for(var j=i+1;j<jsonList.length;j++){
            var curr = jsonList[i].Profiles[0].Integers[0];
            var toSwap = jsonList[j].Profiles[0].Integers[0];

            if(curr > toSwap){
                var temp = jsonList[i];
                jsonList[i] = jsonList[j];
                jsonList[j] = temp;
            }
        }
    }

    return jsonList;
}

function populateExercise(jsonList){
    var ret = [];
    for(var i=0;i<jsonList.length-1;i++){
        var day = jsonList[i].Profiles[0].Integers[0];
        var nextDay = jsonList[i+1].Profiles[0].Integers[0];

        if(day != nextDay){
            ret.push(exerciseStringify(jsonList[i]));
            ret.push("nonexistent");
        }
        else{
            ret.push(exerciseStringify(jsonList[i]));
        }
    }

    ret.push(exerciseStringify(jsonList[jsonList.length-1]));
    ret.push("nonexistent");

    return ret;
}

function makeJsonWithList(jsonList){
    var jl = populateExercise(jsonList);

    var begin = '"en-US": {' + '"translation": {' + '"EXERCISE": ['

    var end = '],'+
                '"SKILL_NAME" : "Workout Plan",' +
                '"GET_WORKOUT_MESSAGE" : "Your next exercise is ",' + 
                '"HELP_MESSAGE" : "You can say next exercise to move on.",' +
                '"HELP_REPROMPT" : "What can I help you with?",' +
                '"STOP_MESSAGE" : "Goodbye!"}'
    for(var z=0;z<jl.length-1;z++){
        begin += jl[z];
        begin += ','
    }
    begin +=jl[jl.length-1];

    begin += end;

    return begin;
}



//JSON functions


//Alexa code starts
var Alexa = require('alexa-sdk');

var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var loopEnd = "nonexistent";
var endFactor = "";
var workoutIndex = 0;
var workoutItem =null;
var currentDay = 0;
var totalDays = null;
var speechOutput = null;
var completedWorkout = "You have completed today's workout!";
var completedWhole = "You have finished your entire workout plan! Good job!"
var languageStrings = {
    
    "en-US": {
        "translation": {
            "EXERCISE": [],
            "SKILL_NAME" : "Workout Plan",
            "GET_WORKOUT_MESSAGE" : "Your next exercise is ",
            "HELP_MESSAGE" : "You can say next exercise to move on.",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
    
};


var workoutList = null;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    
    
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    
    alexa.execute();
    


};

var handlers = {
    'LaunchRequest': function () {
        this.emit('StartWork');
        
    },
    'StartWorkout': function () {

        this.emit('StartWork');

    },
    
    'StartWork': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        //totalDays = getMaxDays(myObj);

        languageStrings = JSON.parse(makeJsonWithList(myObj));

        

        workoutList = this.t('EXERCISE');

        //for(int i =0;i<workoutList.length;i++){
            //workoutIndex = i;
            //workoutItem = workoutList[workoutIndex];
            //var speechOutput = this.t("GET_WORKOUT_MESSAGE") + workoutItem;
            //this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), workoutItem)

       //}
        workoutItem = workoutList[workoutIndex];
        // Create speech output
        //while(workoutItem!=loopEnd){
        var workoutList = new Workout();
        workoutList.get(workout).then(function (list){
            var data = workoutList;
            console.log(data);
            res.say(data).send();
        }).catch(function (err){
            console.log(err.statusCode);
            var prompt = "I didn\'t have data for " + list;
            res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
        });
        speechOutput = this.t("GET_WORKOUT_MESSAGE") + workoutItem;
        /*if(workoutItem==endFactor){
            break();
        }*/
      
        if(workoutItem===loopEnd){
            this.emitWithState('FinishExercise');
        }
            //this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), workoutItem);
            this.emit(':ask',speechOutput,"Say next exercise when you are finished.");
            //this.emitWithState('FinishExercise');

            
        
        

        //workoutIndex++;
        //workoutItem = workoutList[workoutIndex];

       // }
    },
    'FinishExercise': function() {
        workoutIndex++;
        if((workoutItem) === loopEnd ){
            currentDay++;
            this.emit(':tell', completedWorkout);
        }
        if((workoutIndex+1)===workoutList.length){
            this.emit(':tell',completedWhole);
        }
        



        this.emitWithState('StartWork');


    },
    'AMAZON.HelpIntent': function () {
        speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};