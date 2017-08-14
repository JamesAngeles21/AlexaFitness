// Global Parameters
var global_enterpriseEndpointUri = "https://hack.softheon.io/api/enterprise";
var global_tokenEndpointUri = "https://hack.softheon.io/api/identity/core/connect/token";
var global_clientId = "hack010";
var global_clientSecret = "hack010";
var global_scope = "enterpriseapi";
var global_drawer = 10;
var global_token;

/**
 * On Document Ready
 */
$(function () {
    requestAccessToken(global_enterpriseEndpointUri,
        global_tokenEndpointUri,
        global_clientId,
        global_clientSecret,
        global_scope,
        function (token) {
            global_token = token;
            console.log("requestAccessToken");
            
            getProgram(token, "Coach",1,43, printInfo);

            
        });
});

function printInfo(elements){
  for(var i=0;i<elements.length;i++){

  }
}

function craftWorkout(token){
    insertExerciseRep(token, 1, "Coach Alexa", 5, 5, "Bench Press");
    insertExerciseRep(token, 1, "Coach Alexa", 8, 3, "Pullups");
    insertExerciseTime(token, 1, "Coach Alexa", 30, "Planks");

    insertExerciseRep(token, 2, "Coach Alexa", 5, 5, "Squat");
    insertExerciseRep(token, 2, "Coach Alexa", 6, 3, "Overhead Press");
    insertExerciseTime(token, 2, "Coach Alexa", 240, "Stretching");

    insertExerciseRep(token, 3, "Coach Alexa", 2, 5, "Snatch");
    insertExerciseRep(token, 3, "Coach Alexa", 3, 3, "Clean and Jerk");
    insertExerciseTime(token, 3, "Coach Alexa", 600, "Treadmill");
}

function deleteEntities(token, from, to){
    for(var i=from;i<=to;i++){
        deleteEntity(token, i);
    }

    console.log("fin");
}


/**
 * Inserts a Time-based exercise
 * token - request token access and use that global token
 * day_number - the day number of the program
 * program_name - name of the program
 * time - time it takes to do this exercise
 * exercise - name of the exercise
 */
function insertExerciseTime(token, day_number, program_name, time, exercise) {
    apiUri = global_enterpriseEndpointUri;
    drawer = global_drawer
    type = 10003
    // https://hack.softheon.io/api/enterprise/content/v1/folder/{drawer}
    var url = apiUri + "/content/v1/folder/" + drawer;

    var folder = {
      "Profiles": [
        {
          "Acl": -1,
          "Type": 1,
          "Strings": [
          program_name
          ],
          "Integers": [
          day_number,
          time
          ]
        }
      ],
      "Acl": -1,
      "Type": type,
      "Name": exercise
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "authorization": "Bearer " + token,
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(folder)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

/**
 * Inserts a Rep-based exercise
 * token - request token access and use that global token
 * day_number - the day number of the program
 * program_name - name of the program
 * reps - number of repetitions in this particular exercise
 * sets - number of sets in this particular exercise
 * exercise - name of the exercise
 */
function insertExerciseRep(token, day_number, program_name, reps, sets, exercise) {
    apiUri = global_enterpriseEndpointUri;
    drawer = global_drawer
    type = 10004
    // https://hack.softheon.io/api/enterprise/content/v1/folder/{drawer}
    var url = apiUri + "/content/v1/folder/" + drawer;

    var folder = {
      "Profiles": [
        {
          "Acl": -1,
          "Type": 1,
          "Strings": [
          program_name
          ],
          "Integers": [
          day_number,
          reps,
          sets
          ]
        }
      ],
      "Acl": -1,
      "Type": type,
      "Name": exercise
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "authorization": "Bearer " + token,
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(folder)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

/**
 * Deletes the folder with the ID
 */
function deleteEntity(token, id) {
    apiUri = global_enterpriseEndpointUri;
    drawer = global_drawer;
    // https://hack.softheon.io/api/enterprise/content/v1/folder/{drawer}/{id}
    var url = apiUri + "/content/v1/folder/" + drawer + "/" + id;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "DELETE",
        "headers": {
            "authorization": "Bearer " + token
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

/**
 * Gets the folder with the ID
 */
function getEntity(token, id, operation) {
    apiUri = global_enterpriseEndpointUri;
    drawer = global_drawer

    // https://hack.softheon.io/api/enterprise/content/v1/folder/{drawer}/{id}
    var url = apiUri + "/content/v1/folder/" + drawer + "/" + id;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "authorization": "Bearer " + token
        }, 
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        operation(response)
    });
}

/*
* token - security token
* program_name - name of the program you want to get
* page - which page you are getting
* page_size - how many elements per page u want
* operation - callback function to modify the results of the program.
*/
function getProgram(token, program_name, page, page_size, operation) {
  apiUri = global_enterpriseEndpointUri;
  drawer = global_drawer;

  var true_list = []

    // https://hack.softheon.io/api/enterprise/content/v1/folder/{drawer}/{id}
    var url = apiUri + "/content/v1/folder?" +
          "page=" + page + "&" +
          "drawerID=" + drawer + "&" +
          "pageSize=" + page_size + "&" 
          "metadata[0][profileType]=1&" +
          "metadata[0][fieldIndex]=0&" +
          "metadata[0][fieldValue]=" + program_name;

    console.log("url: "+ url);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "authorization": "Bearer " + token
        }
    }

    $.ajax(settings).done(function (response) {

        console.log(response);

        for(var i=0;i<response.length;i++){
          if(response[i].State != 4){
            getEntity(token, response[i].FolderID, function(element){
              console.log("JSONstringify:  "+JSON.stringify(element));
            });
            true_list.push(response[i]);
          }
        }

        operation(true_list);

    });
}
