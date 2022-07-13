//=============================================================================
//                             Global variables
//=============================================================================

//the page body itself
const pageBody = document.getElementById("pageBody");

//the minimise and restore btns
const minimseQuickstartButton = document.getElementById("minimseQuickstartButton");
const restoreQuickstartButton = document.getElementById("restoreQuickstartButton");

//the save, start and add btns
const saveBtn = document.getElementById("save-btn");
const startBtn = document.getElementById("start-btn");
const addBtn = document.getElementById("add-btn");

//the form inside quickstart section
const form = document.getElementById("theForm");

//the form inputs
const allTheFormInputs = document.querySelectorAll("#theForm input[type='number']");
const sets = document.getElementById("sets");
const workMinsInput = document.getElementById("workMinsInput");
const workSecondsInput = document.getElementById("workSecondsInput");
const restMinsInput = document.getElementById("restMinsInput");
const restSecondsInput = document.getElementById("restSecondsInput");

//the plus and minus buttons inside the quickstart section
const decrementSetsBtn = document.getElementById("decrementSets");
const incrementSetsBtn = document.getElementById("incrementSets");

const decrementWorkPeriodBtn = document.getElementById("decrementWorkPeriod");
const incrementWorkPeriodBtn = document.getElementById("incrementWorkPeriod");

const decrementRestPeriodBtn = document.getElementById("decrementRestPeriod");
const incrementRestPeriodBtn = document.getElementById("incrementRestPeriod");

//the prepare screen
const prepareScreen = document.getElementById("prepareScreen");

//the prepare screen spans
const prepMins = document.getElementById("prepMins");
const prepSecs = document.getElementById("prepSecs");

//the prepare screen buttons
const exitPrepareScreenBtn = document.getElementById("exitPrepareScreen");

//the work screen
const workScreen = document.getElementById("workScreen");

//the work screen spans
const workSets = document.getElementById("workSets");
const workMins = document.getElementById("workMins");
const workSecs = document.getElementById("workSecs");

//the work screen buttons
const exitWorkScreenBtn = document.getElementById("exitWorkScreen");

//the rest screen
const restScreen = document.getElementById("restScreen");

//the rest screen spans
const restSets = document.getElementById("restSets");
const restMins = document.getElementById("restMins");
const restSecs = document.getElementById("restSecs");

//the rest screen buttons
const exitRestScreenBtn = document.getElementById("exitRestScreen");

//the finishedScreen
const finishedScreen = document.getElementById("finishedScreen");

//the finished screen span-buttons
const restartSameBtn = document.getElementById("restartSame");
const refreshPageBtn = document.getElementById("refreshPage");

//boolean to determine if prepare screen should be shown
let isFirstSet = true;

//the save preset screen (modal)
const savePresetScreen = document.getElementById("savePresetModal");

//theForm2
const form2 = document.getElementById("theForm2");

//the cancelSave btn
const cancelSaveBtn = document.getElementById("cancelSave");

//the submitSave btn
const submitSaveBtn = document.getElementById("submitSave");

//the presetName Input
const presetName = document.getElementById("presetName");

//the presets section
const presets = document.getElementById("presets");

//the header div in the presets section (non-modal i.e once they've BEEN saved)
const presetsHeaderContainer = document.getElementById("presetsHeaderContainer");

//the instructions paragraph in the presets section
const presetsParagraph = document.getElementById("presetsParagraph");

//the actual presets
const actualSavedPresets = document.getElementById("actualSavedPresets");

//=============================================================================
//                             Event listeners
//=============================================================================


//click event listeners on the minimise and restore btns
minimseQuickstartButton.addEventListener("click", minimiseQuickstartSection);
restoreQuickstartButton.addEventListener("click", restoreQuickstartSection);

//click event listeners on the save and add btns
saveBtn.addEventListener("click", quickSave);
addBtn.addEventListener("click", advancedSettings);

//click event listeners on the plus and minus btns in the quickstart section
decrementSetsBtn.addEventListener("click", minusOneSet);
incrementSetsBtn.addEventListener("click", plusOneSet);

decrementWorkPeriodBtn.addEventListener("click", minusOneFromWorkPeriod);
incrementWorkPeriodBtn.addEventListener("click", plusOneToWorkPeriod);

decrementRestPeriodBtn.addEventListener("click", minusOneFromRestPeriod);
incrementRestPeriodBtn.addEventListener("click", plusOneToRestPeriod);

//submit event listener on theForm
form.addEventListener("submit", quickStart)

//click event listener on exit prep screen btn
exitPrepareScreenBtn.addEventListener("click", exitPrepareScreen)

//click event listener on refresh the page btn
refreshPageBtn.addEventListener("click", refreshPage)

//click event listener on the cancelSave btn
cancelSaveBtn.addEventListener("click", refreshPage)

//submit event listener on theForm2
form2.addEventListener("submit", handleSave);

//load event listener on the page
window.addEventListener("load", getAndDisplayExistingPresets);

//=============================================================================
//                          Onload fns
//=============================================================================

//when the page first loads, get all the previously saved presets and show them
function getAndDisplayExistingPresets () {

    console.log(`There are ${localStorage.length} existing presets in local storage to show`);

    /*local storage is an object so to get the items within it without knowing their 
    keys in advance (since the user is the one who names each preset), use Object.keys
    which returns an array of all the keys (in this case all the preset names the user saved)*/
    let arrayOfSavedPresetNames = Object.keys(localStorage);
    console.log(arrayOfSavedPresetNames);

    arrayOfSavedPresetNames.forEach(

        (arrayElement) => {

            console.log(arrayElement);

            let savedPresetString = localStorage.getItem(arrayElement);/*this is a string in the format:
            numberOfSets, workMins, workSecs, restMins, restSecs*/
            console.log(savedPresetString);

            //to get each individual input I have to use split rather than slice because the inputs could have any possible no of characters
            let newArrayPostSplit = savedPresetString.split(",");
            console.log(newArrayPostSplit);

            //now display the preset
            insertNewSavedPreset(arrayElement, newArrayPostSplit[0], newArrayPostSplit[1], newArrayPostSplit[2], newArrayPostSplit[3], newArrayPostSplit[4]);

        }


    )


}



//=============================================================================
//                          Quickstart section fns
//=============================================================================

function minimiseQuickstartSection () {
    //hide theForm
    form.style.display = "none";

    //hide the minimise btn
    minimseQuickstartButton.classList.add("hidden");

    //unhide the restore btn
    restoreQuickstartButton.classList.remove("hidden");
}

function restoreQuickstartSection () {
    //unhide theForm
    form.style.display = "block";

    //unhide the minimise btn
    minimseQuickstartButton.classList.remove("hidden");

    //hide the restore btn
    restoreQuickstartButton.classList.add("hidden");
}

function minusOneSet () {
    sets.value--;
}

function plusOneSet () {
    sets.value++;
}

function minusOneFromWorkPeriod () {

    //if seconds > 0 minus one from the seconds, else minus one from the mins (and then reset the secs to 59)
    if(workSecondsInput.value > 0) {workSecondsInput.value--;}
    else{
        workMinsInput.value--;
        workSecondsInput.value = "59";
    }

}

function plusOneToWorkPeriod () {

    //if seconds < 59, add one to the seconds, else add one to the mins (and then reset the secs to 0)
    if(workSecondsInput.value < 59) {workSecondsInput.value++;}
    else{
        workMinsInput.value++;
        workSecondsInput.value = "00";
    }

}




function minusOneFromRestPeriod () {

    //if seconds > 0 minus one from the seconds, else minus one from the mins (and then reset the secs to 59)
    if(restSecondsInput.value > 0) {restSecondsInput.value--;}
    else{
        restMinsInput.value--;
        restSecondsInput.value = "59";
    }

}

function plusOneToRestPeriod () {

    //if seconds < 59, add one to the seconds, else add one to the mins (and then reset the secs to 0)
    if(restSecondsInput.value < 59) {restSecondsInput.value++;}
    else{
        restMinsInput.value++;
        restSecondsInput.value = "00";
    }

}





function quickSave () {
    console.log("save btn event listener working");

    //show the save presets screen modal
    savePresetScreen.classList.remove("hidden");

    //make the rest of the page kinda fade to the background so the save presets screen stands out more
    pageBody.classList.add("grey-background");

    //give the inputs in theForm a grey background too
    for (let i = 0; i < allTheFormInputs.length; i++) {
        allTheFormInputs[i].classList.add("grey-background");
    }

    //make pageBody unscrollable so the white background of the save presets modal doesnt clash with the actually already saved presets
    pageBody.classList.add("stop-scrolling");

    //make theForm (and consequently the start and save buttons as well as the number inputs) unclickable while the presets screen is showing
    form.classList.add("unclickable");

    //do the same for the add btn
    addBtn.classList.add("unclickable");


}

function handleSave (event) {

    event.preventDefault();

    //call the insertNewSavedPreset fn to write into the html using the relevant inputs
    insertNewSavedPreset(presetName.value, sets.value, workMinsInput.value, workSecondsInput.value, restMinsInput.value, restSecondsInput.value);

    //call the savePresetToLocalStorage fn to actually save the relevant inputs to local storage
    savePresetToLocalStorage (presetName.value, sets.value, workMinsInput.value, workSecondsInput.value, restMinsInput.value, restSecondsInput.value);

    //then hide the save presets screen modal again
    savePresetScreen.classList.add("hidden");

    //remove the grey background from the page
    pageBody.classList.remove("grey-background");

    //remove the grey background from the inputs in theForm as well
    for (let i = 0; i < allTheFormInputs.length; i++) {
        allTheFormInputs[i].classList.remove("grey-background");
    }

    //make pageBody scrollable again
    pageBody.classList.remove("stop-scrolling");

    //make theForm (and consequently the start and save buttons as well as the number inputs) clickable again
    form.classList.remove("unclickable");

    //do the same for the add btn
    addBtn.classList.remove("unclickable");


}

function savePresetToLocalStorage (presetNameToSave, setsToSave, workMinsToSave, workSecsToSave, restMinsToSave, restSecsToSave) {

    let whatToSave = `${setsToSave}, ${workMinsToSave}, ${workSecsToSave}, ${restMinsToSave}, ${restSecsToSave}`;
    console.log(`This '${whatToSave}' is what will be in local storage under the name '${presetNameToSave}'`);

    //now actually save it to local storage
    localStorage.setItem(presetNameToSave, whatToSave);
    

}

function insertNewSavedPreset (presetNameToSave, setsToSave, workMinsToSave, workSecsToSave, restMinsToSave, restSecsToSave) {

    console.log(`The submit save button passed in these args: 
    - this name: ${presetNameToSave} 
    - this many sets: ${setsToSave} 
    - this many mins of work: ${workMinsToSave} 
    - this many secs of work: ${workSecsToSave}
    - this many mins of rest: ${restMinsToSave}
    - this many secs of rest: ${restSecsToSave}`);

    //because the user might pass in values with a leading 0 (eg 0005 mins and 003 secs instead of just 5mins3secs), I need to transform the args
    //parseInt removes the leading zeros
    let transformedSets = parseInt(setsToSave, 10);
    let transformedworkMins = parseInt(workMinsToSave, 10);
    let transformedworkSecs = parseInt(workSecsToSave, 10);
    let transformedrestMins = parseInt(restMinsToSave, 10);
    let transformedrestSecs = parseInt(restSecsToSave, 10);

    //calculate total time i.e default prepare time (5 secs) + no.ofsets*work time per set + (no of sets -1)*rest time per set [-1 since there is no rest period on the final set]
    let workTimePerSetInSeconds = (transformedworkMins * 60) + transformedworkSecs;
    let restTimePerSetInSeconds = (transformedrestMins * 60) + transformedrestSecs;
    let totalTimeInSeconds = 5 + (transformedSets *  workTimePerSetInSeconds) + ( (transformedSets -1) * restTimePerSetInSeconds ) ;

    //now convert that into mins and secs using the remainder/modulus
    let totalTimeSecsRemainder = totalTimeInSeconds % 60;
    let totalTimeMinsQuotient = (totalTimeInSeconds - totalTimeSecsRemainder) / 60;

    //but I still need to add a single zero when the mins or secs < 10 eg I dont want to write 5:5 into the html instaed of 05:05
    if(transformedworkMins < 10) {transformedworkMins = `0`.concat(transformedworkMins);}
    if(transformedworkSecs < 10) {transformedworkSecs = `0`.concat(transformedworkSecs);}

    if(transformedrestMins < 10) {transformedrestMins = `0`.concat(transformedrestMins);}
    if(transformedrestSecs < 10) {transformedrestSecs = `0`.concat(transformedrestSecs);}

    if(totalTimeSecsRemainder < 10) {totalTimeSecsRemainder = `0`.concat(totalTimeSecsRemainder);}
    if(totalTimeMinsQuotient < 10) {totalTimeMinsQuotient = `0`.concat(totalTimeMinsQuotient);}
    

    //now the template html, customisable using backtics and interpolation
    let htmlToInsert = `<div id="${presetNameToSave}SavedPreset" class="stack-md white-background">

    <div class="row justify-space-between">
        <h3 id="${presetNameToSave}SavedPresetName" class="sm-mgn-lft-and-rt medium-text">${presetNameToSave}</h3>
        <p id="${presetNameToSave}SavedPresetTotalTime" class="sm-mgn-lft-and-rt">${totalTimeMinsQuotient}:${totalTimeSecsRemainder}</p>
    </div>

    
    <span class="sm-mgn-lft-and-rt">SETS</span><span id="${presetNameToSave}SavedPresetTotalSets">${transformedSets}x</span><br>
    <span class="sm-mgn-lft-and-rt">WORK</span><span id="${presetNameToSave}SavedPresetWorkTime">${transformedworkMins}:${transformedworkSecs}</span><br>
    <span class="sm-mgn-lft-and-rt">REST</span><span id="${presetNameToSave}SavedPresetRestTime">${transformedrestMins}:${transformedrestSecs}</span><br>
    

    <div class="row justify-space-evenly">
        <button type="button" class="preset-edit-btn"><i class='fas fa-pen' style='margin-right:0.5rem'></i>Edit</button>
        <button type="button" class="preset-delete-btn"><i class='fas fa-trash-alt' style='margin-right:0.5rem'></i>Delete</button>
        <button type="button" class="preset-start-btn"><i class='fas fa-play' style='margin-right:0.5rem'></i>START</button>
    </div>

</div>`;


    //now insert the html in the right position
    presetsParagraph.insertAdjacentHTML("afterend", htmlToInsert);

    



}


function quickStart (event) {
    event.preventDefault();
    console.log("start btn event listener working");

    if(isFirstSet == true) {
        //write into the prepare screen
        writeIntoPrepareScreen(0, 5);
        
        //display the preparescreen
        prepareScreen.classList.remove("hidden");
        
        //start the 5-second countdown
        startPrepareScreenCountDown(0, 5);
    }

    else{
        //replace rest screen with the work screen
        getAndShowWorkScreen();
    }

}

function writeIntoPrepareScreen (mins, secs) {

    if (mins >= 10 && secs >= 10) {//i.e. if both don't need to have a 0 added to the front
        prepMins.innerHTML = mins;
        prepSecs.innerHTML = secs;
    }

    else if (mins >= 10 && secs < 10) {//i.e. if only secs needs to have a 0 added to the front
        prepMins.innerHTML = mins;
        prepSecs.innerHTML = "0" + secs;
    }

    else if (mins < 10 && secs >= 10) {//i.e. if only mins needs to have a 0 added to the front
        prepMins.innerHTML = "0" + mins;
        prepSecs.innerHTML = secs;
    }

    else {//i.e. if both need to have a 0 added to the front
        prepMins.innerHTML = "0" + mins;
        prepSecs.innerHTML = "0" + secs;
    }

}

function startPrepareScreenCountDown (mins, secs) {

    //first get the prep countdown length
    let lengthOfPrepCountdownInMs = ( (mins * 60) + secs ) * 1000;
    console.log(lengthOfPrepCountdownInMs);

    //get the current time
    const timePrepCountdownStarts = new Date();
    console.log(`prep countdown starts one second after ${timePrepCountdownStarts}`);
    
    //now calculate the time the countdown should end
    let milliseconds = timePrepCountdownStarts.getTime();
    console.log(milliseconds);

    let newMs = milliseconds + lengthOfPrepCountdownInMs + 1000;  //note because setInterval happens with a delay, add one extra second (1000 ms)
    console.log(newMs);

    const timePrepCountdownEnds = new Date(newMs);
    console.log(`prep countdown finishes ${timePrepCountdownEnds}`);

    const x = setInterval( () => {//i.e every second, do the following
      
       //while the currentTime < timeCountdownEnds, keep changing the relevant innerHTML
       let currentTimeInMs = new Date().getTime();

       if (currentTimeInMs < newMs) {
           console.log(`Prep time not over yet, time is still ${new Date()}`);
           console.log(secs);

           if(mins == 0) {/*the simplest case i.e if prep time is less than a min, just decrement the secs arg and write into the html*/
               writeIntoPrepareScreen(mins, secs);
               secs--;
           }
           else {//i.e how to handle longer prep times eg 2mins30secs

             if(secs >= 0 && mins >= 0) {
                 //first just do the same as before
                 writeIntoPrepareScreen(mins, secs);
                 secs--;

                 //but then when the secs reaches -1, reset it to 59 and now decrement the mins
                 if (secs == -1) {
                    secs = 59;
                    mins--;
                 }

             }
                    
           }
    
       }

       else {//what to do at the end of the timer
           console.log(`Time has reached ${new Date()}, prep countdown is finished`);
           writeIntoPrepareScreen(0, 0);

           //now replace prep screen with the work screen
           getAndShowWorkScreen();

           //clear the setInterval
           clearInterval(x);
       }
        
    }, 1000);

    

}

function exitPrepareScreen () {
    //reload the page
    location.reload();
}

function getAndShowWorkScreen () {
    //hide the prepare and rest screens then show the work screen
    prepareScreen.classList.add("hidden");
    restScreen.classList.add("hidden");
    workScreen.classList.remove("hidden");

    //get number of sets, and amount of mins+secs of work time input by user
    let setsValue = parseFloat(sets.value);
    let workMinsInputValue = parseFloat(workMinsInput.value);
    let workSecondsInputValue = parseFloat(workSecondsInput.value);
        
    console.log(`Sets = ${setsValue}, work mins input = ${workMinsInputValue}, work secs input = ${workSecondsInputValue}`);

    //call the startWorkScreenCountown fn with these args
    startWorkScreenCountdown(setsValue, workMinsInputValue, workSecondsInputValue);

}

function writeIntoWorkScreen (sets, mins, secs) {

    if (mins >= 10 && secs >= 10) {//i.e. if both don't need to have a 0 added to the front
        workSets.innerHTML = sets;
        workMins.innerHTML = mins;
        workSecs.innerHTML = secs;
    }

    else if (mins >= 10 && secs < 10) {//i.e. if only secs needs to have a 0 added to the front
        workSets.innerHTML = sets;
        workMins.innerHTML = mins;
        workSecs.innerHTML = "0" + secs;
    }

    else if (mins < 10 && secs >= 10) {//i.e. if only mins needs to have a 0 added to the front
        workSets.innerHTML = sets;
        workMins.innerHTML = "0" + mins;
        workSecs.innerHTML = secs;
    }

    else if (mins < 10 && secs < 10) {//i.e. if both need to have a 0 added to the front
        workSets.innerHTML = sets;
        workMins.innerHTML = "0" + mins;
        workSecs.innerHTML = "0" + secs;
    }
    
}

function startWorkScreenCountdown (sets, mins, secs) {

    //first get the work countdown length
    let lengthOfWorkCountdownInMs = ( (mins * 60) + secs ) * 1000;
    console.log(lengthOfWorkCountdownInMs);

    //get the current time
    const timeWorkCountdownStarts = new Date();
    console.log(`work countdown starts one second after ${timeWorkCountdownStarts}`);

    //now calculate the time the countdown should end
    let milliseconds = timeWorkCountdownStarts.getTime();
    console.log(milliseconds);

    let newMs = milliseconds + lengthOfWorkCountdownInMs + 1000;  //note because setInterval happens with a delay, add one extra second (1000 ms)
    console.log(newMs);

    const timeWorkCountdownEnds = new Date(newMs);
    console.log(`work countdown finishes ${timeWorkCountdownEnds}`);



    const x = setInterval( () => {//i.e every second, do the following
      
        //while the currentTime < timeCountdownEnds, keep changing the relevant innerHTML
        let currentTimeInMs = new Date().getTime();
 
        if (currentTimeInMs < newMs) {
            console.log(`Work time not over yet, time is still ${new Date()}`);
            console.log(secs);
 
            if(mins == 0) {/*the simplest case i.e if prep time is less than a min, just decrement the secs arg and write into the html*/
                writeIntoWorkScreen(sets, mins, secs);
                secs--;
            }
            else {//i.e how to handle longer prep times eg 2mins30secs
 
              if(secs >= 0 && mins >= 0) {
                  //first just do the same as before
                  writeIntoWorkScreen(sets, mins, secs);
                  secs--;
 
                  //but then when the secs reaches -1, reset it to 59 and now decrement the mins
                  if (secs == -1) {
                     secs = 59;
                     mins--;
                  }
 
              }
                     
            }
     
        }
 
        else {//what to do at the end of the timer
            console.log(`Time has reached ${new Date()}, work countdown is finished`);
            writeIntoWorkScreen(sets, 0, 0);
 
            //clear the setInterval
            clearInterval(x);

            //now replace work screen with the rest screen
            getAndShowWRestScreen();
        }
         
     }, 1000);




}

function getAndShowWRestScreen() {

    console.log(`show rest screen now`);

    //hide the work screen and show the rest screen
    workScreen.classList.add("hidden");
    restScreen.classList.remove("hidden");

    //get number of sets, and amount of mins+secs of work time input by user
    let setsValue = parseFloat(sets.value);
    let restMinsInputValue = parseFloat(restMinsInput.value);
    let restSecondsInputValue = parseFloat(restSecondsInput.value);
        
    console.log(`Sets = ${setsValue}, rest mins input = ${restMinsInputValue}, rest secs input = ${restSecondsInputValue}`);

    //call the startWorkScreenCountown fn with these args
    startRestScreenCountdown(setsValue, restMinsInputValue, restSecondsInputValue);


}


function writeIntoRestScreen (sets, mins, secs) {

    if (mins >= 10 && secs >= 10) {//i.e. if both don't need to have a 0 added to the front
        restSets.innerHTML = sets;
        restMins.innerHTML = mins;
        restSecs.innerHTML = secs;
    }

    else if (mins >= 10 && secs < 10) {//i.e. if only secs needs to have a 0 added to the front
        restSets.innerHTML = sets;
        restMins.innerHTML = mins;
        restSecs.innerHTML = "0" + secs;
    }

    else if (mins < 10 && secs >= 10) {//i.e. if only mins needs to have a 0 added to the front
        restSets.innerHTML = sets;
        restMins.innerHTML = "0" + mins;
        restSecs.innerHTML = secs;
    }

    else if (mins < 10 && secs < 10) {//i.e. if both need to have a 0 added to the front
        restSets.innerHTML = sets;
        restMins.innerHTML = "0" + mins;
        restSecs.innerHTML = "0" + secs;
    }
    
}


function startRestScreenCountdown (sets, mins, secs) {
    
    //first get the rest countdown length
    let lengthOfRestCountdownInMs = ( (mins * 60) + secs ) * 1000;
    console.log(lengthOfRestCountdownInMs);
    
    //get the current time
    const timeRestCountdownStarts = new Date();
    console.log(`rest countdown starts one second after ${timeRestCountdownStarts}`);


    //now calculate the time the countdown should end
    let milliseconds = timeRestCountdownStarts.getTime();
    console.log(milliseconds);


    let newMs = milliseconds + lengthOfRestCountdownInMs + 1000;  //note because setInterval happens with a delay, add one extra second (1000 ms)
    console.log(newMs);

    const timeRestCountdownEnds = new Date(newMs);
    console.log(`work countdown finishes ${timeRestCountdownEnds}`);
    
    
    const x = setInterval( () => {//i.e every second, do the following
  
    
        //while the currentTime < timeCountdownEnds, keep changing the relevant innerHTML
        let currentTimeInMs = new Date().getTime();

    
        if (currentTimeInMs < newMs) {

            console.log(`Rest time not over yet, time is still ${new Date()}`);
            console.log(secs);

        
            if(mins == 0) {/*the simplest case i.e if prep time is less than a min, just decrement the secs arg and write into the html*/
                writeIntoRestScreen(sets, mins, secs);
                secs--;
            }
        
            else {//i.e how to handle longer prep times eg 2mins30secs
                
                if(secs >= 0 && mins >= 0) {
              
                    //first just do the same as before
                    writeIntoRestScreen(sets, mins, secs);
                    secs--;

              
                    //but then when the secs reaches -1, reset it to 59 and now decrement the mins
              
                    if (secs == -1) {
                        secs = 59;
                        mins--;
                    }
                }
            }
        }
        
        else {//what to do at the end of the timer
            console.log(`Time has reached ${new Date()}, rest countdown is finished`);
            writeIntoRestScreen(sets, 0, 0);
            
            //clear the setInterval
            clearInterval(x);

            //change the value of the sets input in the html
            /*note: can't just use sets.value here instead of selecting it by input type number
            since sets is the name of the global variable AND the argument passed into the fn*/
            let userSets =document.querySelector("input[type='number']")
            userSets.value = sets - 1;


            //if condition to handle case where sets reaches 0 (i.e at the end of the final rest countdown)
            if(userSets.value == 0) {
                //hide the prepare, work and rest screens
                prepareScreen.classList.add("hidden");
                restScreen.classList.add("hidden");
                workScreen.classList.add("hidden");
                
                //show the finished screen
                alert(`finished`);
                finishedScreen.classList.remove("hidden");
            }

            else {
                //now change the isFirstSet boolean
                isFirstSet = false;
                
                //now submit theForm again
                startBtn.click();
            }
            
            
        }
    
    }, 1000);


}


function refreshPage () {
    location.reload();
}


//=============================================================================
//                           Presets section fns
//=============================================================================
function advancedSettings () {
    console.log("add btn event listener working");

    

}