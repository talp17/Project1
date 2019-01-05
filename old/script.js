//set the height of the lines to the notebook
var heightForm  = document.forms["taskForm"].offsetHeight;
document.getElementById("lines").style.height = heightForm + "px";


function saveForm(){
    var textDetails = document.forms["taskForm"]["taskdetails"].value;
    var taskDate = document.forms["taskForm"]["taskdate"].value;
    var taskHours = document.forms["taskForm"]["taskhours"].value;
    // change the taskDate from sting into date fornat again
    var dateString =  taskDate.split("-").reverse().join("/");
    if(textDetails == "" || taskDate=="")
        alert("You must enter task details and date");
    else
        addnote(textDetails,dateString,taskHours);

}
function addnote(textDetails,taskDate,taskHours){
    var notesContainer= document.getElementById("noteContainer");

    //crate new ekements
    var note = document.createElement("li");
    var x = document.createElement("i");
    x.setAttribute("class", "fas fa-times");
    var dateAndHourContainer  = document.createElement("div");
    dateAndHourContainer.setAttribute("id", "dateContainer");
    var text = document.createElement("p");
    var date = document.createElement("span");
    var hour = document.createElement("span");

    // add the text to the note
    text.textContent = textDetails;
    date.textContent = taskDate;
    hour.textContent = taskHours;

    // add the elements to HTML
    note.appendChild(x);
    note.appendChild(text);
    
    dateAndHourContainer.appendChild(date);
    dateAndHourContainer.appendChild(hour);
    note.appendChild(dateAndHourContainer);
    noteContainer.appendChild(note);  
}

function resetForm(){
    document.forms["taskForm"]["taskdetails"].value ="";
    document.forms["taskForm"]["taskdate"].value="";
    document.forms["taskForm"]["taskhours"].value="";
}