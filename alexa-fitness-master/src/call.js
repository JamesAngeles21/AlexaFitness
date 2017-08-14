var queryString = require('querystring');
var https = require('https');
var sendingVariable = null;
// Token Endpoint
var hostUrl = "hack.softheon.io";
var tokenEndpointPath = "/api/identity/core/connect/token";
var folderEndpointPath = "/api/enterprise";
var accessToken;
var badState = 4;
var program_name = "Coach Alexa";
// Example Client Credentials
var clientId = "hack010";
var clientSecret = "hack010";
var scope = "enterpriseapi";

module.exports = {
    getWorkouts:function(){
        return new Promise((resolve, reject) =>{
            requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope)
            .then(postData => {
              // Do stuff with users
              getProgram(accessToken, 10, "Coach Alexa", 1, 100)
              .then(entities => {
                  //console.log(entities);
                  resolve(entities);
              })
                    
            }) 

        })
           
 }
};


function requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope){
    return new Promise((resolve, reject) => {

	var postData = queryString.stringify({
        'grant_type' : 'client_credentials',
        'scope' : scope    
    });

    var postOptions = {
        host: hostUrl,
        port: '443',
        path: tokenEndpointPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        }
    };

    var postRequest = https.request(postOptions, function(res)
    {
        var data = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk){
            var jsonResponse = JSON.parse(chunk);
             accessToken = jsonResponse['access_token'];
            //console.log(accessToken);
            
           
            
             resolve(postData);
        });
    });

    postRequest.write(postData);
    postRequest.end();


         
     });
}




function getEntity(token, drawer, id) {
    return new Promise((resolve, reject) => {

    var output = "";
        
    var getOptions = {
            host: hostUrl,
            port: '443',
            path: folderEndpointPath + "/content/v1/folder/" + drawer + "/" + id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
    };

    var getRequest = https.request(getOptions, function(res)
    {
        res.setEncoding('utf8');

        res.on('data', function (chunk){
            output += chunk;            
        });

        res.on("end", function(){
            var the_entity = JSON.parse(output);

            //entities_list.append(obj);
            resolve(the_entity);
        });

    });

    getRequest.end();
    
 });
}


function getProgram(token, drawer, program_name, page, page_size, operation) {
   
    return new Promise((resolve, reject) => {
    var true_list = [];
    var temp_entities = [];
    var entities = [];
    var getOptions = {
            host: hostUrl,
            port: '443',
            path: folderEndpointPath + "/content/v1/folder?" + "page=" + page + "&" + "drawerID=" + drawer + "&" +  "pageSize=" + page_size + "&",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
    };

    var getRequest = https.request(getOptions, function(res)
    {
        res.setEncoding('utf8');

        var output = "";

        res.on('data', function (chunk){
            output += chunk;

        });

        res.on("end", function(){
            var obj = JSON.parse(output);
            for(var i=0;i<obj.length;i++){
                if(obj[i].State != 4){
                    true_list.push(obj[i]);
                }
            }

            for(var x=0;x<true_list.length;x++){
                getEntity(token, drawer, true_list[x].FolderID).then(the_entity => {

                    temp_entities.push(the_entity);              
                         
                    if(temp_entities.length >= true_list.length){
                        for(var y=0;y<temp_entities.length;y++){
                            if(temp_entities[y].Profiles[0].Strings[0] == program_name){
                                entities.push(temp_entities[y]);
                            }
                        }
                        resolve(entities);
                        //console.log("entitess"+ entities);
                    }
                })
            }
            
        });
    });

    getRequest.end();
    
 });
}

/*
function getProgram(token, drawer, program_name, page, page_size, operation) {
   
    return new Promise((resolve, reject) => {
    var true_list = [];
    var entities = [];
    var getOptions = {
            host: hostUrl,
            port: '443',
            path: folderEndpointPath + "/content/v1/folder?" + "page=" + page + "&" + "drawerID=" + drawer + "&" +  "pageSize=" + page_size + "&",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
    };

    var getRequest = https.request(getOptions, function(res)
    {
        res.setEncoding('utf8');

        var output = "";

        res.on('data', function (chunk){
            output += chunk;

        });

        res.on("end", function(){
            var obj = JSON.parse(output);
            for(var i=0;i<obj.length;i++){
                if(obj[i].State != 4){
                    true_list.push(obj[i]);
                }
            }

            for(var x=0;x<true_list.length;x++){
                id = true_list[x].FolderID;

                var outputIn = "";
        
                var getOptions = {
                        host: hostUrl,
                        port: '443',
                        path: folderEndpointPath + "/content/v1/folder/" + drawer + "/" + id,
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                };

                var getRequest = https.request(getOptions, function(res)
                {
                    res.setEncoding('utf8');

                    res.on('data', function (chunkIn){
                        var obj1 = JSON.parse(chunkIn);

                        entities.push(obj1)

                        if(entities.length >= true_list.length){                            
                            console.log("Entities dump: "+entities);
                            console.log("# of entities: "+entities.length);
                            resolve (entities);
                        }
                    });

                });

                getRequest.end();
            }
            resolve (entities);
        });
    });

    getRequest.end();
    
 });
}*/



