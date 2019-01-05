//set the height of the lines to the notebook
var heightForm  = document.forms["taskForm"].offsetHeight;
document.getElementById("lines").style.height = heightForm + "px";
 
//global array for notes
var notesArray=[];


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
    // change the taskDate from sting into date fornat again
    // var dateString =  taskDate.split("-").reverse().join("/");
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
    //crate new elements
    var note = document.createElement("li");
    var x = document.createElement("i");
   x.className = "fas fa-times";
   
    var dateAndHourContainer  = document.createElement("div");
    dateAndHourContainer.setAttribute("id", "dateContainer");
    var textContainer = document.createElement("div");
    textContainer.setAttribute("id", "textNote");
    var text = document.createElement("p");
    var date = document.createElement("div");
    var hour = document.createElement("div");

    // add the text to the note
    text.textContent = textDetails;
    date.textContent = taskDate;
    hour.textContent = taskHours;

    // add the elements to HTML
    note.appendChild(x);
    // note.appendChild(text);
    
    dateAndHourContainer.appendChild(date);
    textContainer.appendChild(text);
    dateAndHourContainer.appendChild(hour);
    note.appendChild(textContainer);
    note.appendChild(dateAndHourContainer);
    noteContainer.appendChild(note);  

    x.onclick = function(){
        this.parentElement.parentElement.removeChild(this.parentElement);
        removeFromArray(this.parentElement);
        
    };
}

//remove the note content from the array and update the local storage
function removeFromArray(note){

    //get the contents form the note on the DOM
    var noteText = note.children[1].children[0].innerHTML;
    var noteDate =  note.children[2].children[0].innerHTML;
    var noteHour =  note.children[2].children[1].innerHTML;

    //check on the array for the same contents
    for(var i=0;i<notesArray.length;i++){
        if((notesArray[i].taskDetails ==noteText) &&(noteDate == notesArray[i].taskDate) )
        {
            //hour is optional, can be null
            if((noteHour =="")||(notesArray[i].taskHours ==noteHour))
            {
                notesArray.splice(i,1);
                localStorage.setItem("note_local", JSON.stringify(notesArray));
            }
        }
    }

}
function resetForm(){
    document.forms["taskForm"]["taskdetails"].value ="";
    document.forms["taskForm"]["taskdate"].value="";
    document.forms["taskForm"]["taskhours"].value="";
}

function init(){
    if (localStorage.getItem("note_local")) {
        notesArray = JSON.parse(localStorage.getItem("note_local"));
    for(var i=0;i<notesArray.length;i++)
        addnoteToDOM(notesArray[i].taskDetails, notesArray[i].taskDate, notesArray[i].taskHours);
    } 
}

init();