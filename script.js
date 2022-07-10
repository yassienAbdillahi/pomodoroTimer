//=============================================================================
//                             Global variables
//=============================================================================


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
const sets = document.getElementById("sets");
const workMinsInput = document.getElementById("workMinsInput");
const workSecondsInput = document.getElementById("workSecondsInput");
const restMinsInput = document.getElementById("restMinsInput");
const restSecondsInput = document.getElementById("restSecondsInput");

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

//boolean to determine if prepare screen should be shown
let isFirstSet = true;


//=============================================================================
//                             Event listeners
//=============================================================================


//click event listeners on the minimise and restore btns
minimseQuickstartButton.addEventListener("click", minimiseQuickstartSection);
restoreQuickstartButton.addEventListener("click", restoreQuickstartSection);

//click event listeners on the save and add btns
saveBtn.addEventListener("click", quickSave);
addBtn.addEventListener("click", advancedSettings);

//submit event listener on theForm
form.addEventListener("submit", quickStart)

//click event listener on exit prep screen btn
exitPrepareScreenBtn.addEventListener("click", exitPrepareScreen)

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

function quickSave () {
    console.log("save btn event listener working");

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


//=============================================================================
//                           Presets section fns
//=============================================================================
function advancedSettings () {
    console.log("add btn event listener working");
}