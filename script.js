//get the minimise and restore btns
const minimseQuickstartButton = document.getElementById("minimseQuickstartButton");
const restoreQuickstartButton = document.getElementById("restoreQuickstartButton");

//add click event listeners to both
minimseQuickstartButton.addEventListener("click", minimiseQuickstartSection);
restoreQuickstartButton.addEventListener("click", restoreQuickstartSection);


function minimiseQuickstartSection () {
    //get the form inside quickstart section
    const form = document.getElementById("theForm");

    //hide the form
    form.style.display = "none";

    //hide the minimise btn
    minimseQuickstartButton.classList.add("hidden");

    //unhide the restore btn
    restoreQuickstartButton.classList.remove("hidden");

}


function restoreQuickstartSection () {
    //get the form inside quickstart section
    const form = document.getElementById("theForm");

    //unhide the form
    form.style.display = "block";

    //unhide the minimise btn
    minimseQuickstartButton.classList.remove("hidden");

    //hide the restore btn
    restoreQuickstartButton.classList.add("hidden");

}

//get the save and add btns
const saveBtn = document.getElementById("save-btn");
const addBtn = document.getElementById("add-btn");

//add click event listeners to both
saveBtn.addEventListener("click", quickSave);
addBtn.addEventListener("click", advancedSettings);

function quickSave () {
    console.log("save btn event listener working");

}

function advancedSettings () {
    console.log("add btn event listener working");
}