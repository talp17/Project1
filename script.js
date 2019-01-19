//set the height of the lines to the notebook
var heightForm  = document.forms["taskForm"].offsetHeight;
console.log(heightForm);
document.getElementById("lines").style.height = heightForm + "px";
 
//global array for notes
var notesArray=[];


//add the note to array and store it in LocalStorage
function addNoteToArray(textDetails,taskDate,taskHours){
   var obj =  createObjectNote(textDetails,taskDate,taskHours);
    notesArray.push(obj);
    localStorage.setItem("note_local", JSON.stringify(notesArray));
}


function createObjectNote(taskDetails,taskDate,taskHours){
    var noteObj = {
        taskDetails: taskDetails,
        taskDate : taskDate,
        taskHours : taskHours
    }
    return noteObj;
}


function saveForm(){
    var textDetails = document.forms["taskForm"]["taskdetails"].value;
    var taskDate = document.forms["taskForm"]["taskdate"].value;
    var taskHours = document.forms["taskForm"]["taskhours"].value;
    if(textDetails == "" || taskDate=="")
        alert("You must enter task details and date");
    else
    {
        addNoteToArray(textDetails,taskDate,taskHours);
        addnoteToDOM(textDetails,taskDate,taskHours);
        resetForm();
    }
}


function addnoteToDOM(textDetails,taskDate,taskHours){
    var notesContainer= document.getElementById("noteContainer");
    var note = document.createElement("li");
    note.innerHTML = "<i class='fas fa-times' onclick='removeNote(this)'></i>"+ "<div id='textNote'><p>" + textDetails + "</p></div>" + "<div id='dateContainer'><div>" + taskDate + "</div><div>" + taskHours + "</div></div";
    notesContainer.appendChild(note);
}


// remove note from DOM and call for function to remove it from array
function removeNote(x){
    x.parentElement.parentElement.removeChild(x.parentElement);
    removeFromArray(x.parentElement);
}


//remove the note content from the array and update the local storage
function removeFromArray(note){
    //get the contents form the note on the DOM
    var noteText = note.children[1].children[0].innerHTML;
    var noteDate =  note.children[2].children[0].innerHTML;
    var noteHour =  note.children[2].children[1].innerHTML;

    //check over the array for the same contents
    for(var i=0;i<notesArray.length;i++){
        if((notesArray[i].taskDetails ==noteText) &&(noteDate == notesArray[i].taskDate) )
        {
            //hour is optional, can be null
            if((noteHour =="")||(notesArray[i].taskHours ==noteHour))
            {
                notesArray.splice(i,1);
                localStorage.setItem("note_local", JSON.stringify(notesArray));
                //remove only the first one with the same data - if there are two same notes
                break;
            }
        }
    }
}


function resetForm(){
    document.forms["taskForm"]["taskdetails"].value ="";
    document.forms["taskForm"]["taskdate"].value="";
    document.forms["taskForm"]["taskhours"].value="";
}


//Initialize project - check if the local storage is empty (if there aren't any notes), if there is - create them from localStorage.
function init(){
    if (localStorage.getItem("note_local")) {
        notesArray = JSON.parse(localStorage.getItem("note_local"));
    for(var i=0;i<notesArray.length;i++)
        addnoteToDOM(notesArray[i].taskDetails, notesArray[i].taskDate, notesArray[i].taskHours);
    } 
}

init();