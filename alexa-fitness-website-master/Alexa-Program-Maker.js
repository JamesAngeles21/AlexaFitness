var programTitle = "";
var currentDay = 1;
var maxNumberOfDays = 0;
var exercise = "";
var sets = 0;
var reps = 0;
var time = 0;
var programTitleUserVal = document.getElementById('input-11').value;
var exerciseUserVal = document.getElementById('exercise').value;
var setUserVal = document.getElementById('sets').value;
var repUserVal = document.getElementById('type-of-exercise').value;
var timeUserVal = document.getElementById('type-of-exercise').value;
var changeExerciseState;

//function insertExerciseTime(token, day_number, program_name, time, exercise)
function submit(){
    requestAccessToken(global_enterpriseEndpointUri, global_tokenEndpointUri, global_clientId, global_clientSecret,global_scope);
    if(!changeExerciseState) { //assuming correct input 
        insertExerciseTime(global_token, currentDay, programTitle,time,exercise);
    }
    else {
        insertExerciseRep(global_token, currentDay, programTitle, reps,sets,exercise);
    }
}

/*function checkAllContent() { //not in use 
    if(correctInput(programTitleUserVal) && correctInput(exerciseUserVal) && correctInput(setUserVal)) {
        if(typeOfExercise == 0) {
            if(correctInput(timeUserVal)) {
                return true;
            }
        }
        else {
            if(correctInput(repUserVal)) {
                return true;
            }
        }
    }
    return false;
            
}*/

function storeInfo() {
    /*if(!checkAllContent) {
        alert("One of the fields is empty. Please fix this and try again");
    }*/
    exercise = document.getElementById("exercise").value;
    if(changeExerciseState) {
        sets = document.getElementById("sets").value;
    }
    if(changeExerciseState) {
        reps = document.getElementById("type-of-exercise").value;
        console.log(reps);
    }
    else {
        time = document.getElementById("type-of-exercise").value;
        console.log(time);
    }
    

    submit();
    alert("Exercise successfully submitted!");
    clearContent();
    
}



function correctInput(userVal) {
    if(userVal == "" || userVal == 0) {
        return false;
    }
    return true;
    
}

function clearContent() {
    document.getElementById("exercise").value = "";
    document.getElementById("sets").value = "";
    document.getElementById("type-of-exercise").value = "";
    document.getElementById("measurement").style.display = "none";
    
}



function storeTitle() {
    programTitle = document.getElementById("input-11").value;
    document.getElementById("input-11").value = "";
    document.getElementById("program-heading").innerHTML = programTitle;
}



function incrementDay() {
    
    if(currentDay == maxNumberOfDays) {
            alert("Program Finished!");
        }
    if(currentDay  < maxNumberOfDays) {
    
        currentDay++;
        updatePage(currentDay);
        
    
        
    
    }
    
}


function TimedExercise(sets, time) {
    this.sets = sets; 
    this.time = time;
}

function RepExercise(sets, reps) {
    
    this.sets = sets;
    this.reps = reps;
    
}

function changeMaxNumOfDays(max) {
    
    maxNumberOfDays = max;
}

function updatePage(num) {
    
    document.getElementById('title-day').innerHTML = "Day #" + num;
    
    
}

function showDiv() {
    document.getElementById("fourth-page").style.display = "block";
}

function showExerciseType(type) {
    document.getElementById("typeOfActivity").textContent = type;
    document.getElementById("measurement").style.display = "block";
}

function hideorShowSets(num) {
    if(num == 0) {
        document.getElementById("sets-position").style.display = "none";
    }
    else {
        
        document.getElementById("sets-position").style.display = "block";
    }
}


function changeToReps() {
    changeExerciseState = true;
}

function changeToTime() {
    changeExerciseState = false;
}



