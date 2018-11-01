var config = {
apiKey: "AIzaSyAqCYPg3GcLLenwCcVxzMly7CnjhUDAxSI",
authDomain: "rellapp-32f06.firebaseapp.com",
databaseURL: "https://rellapp-32f06.firebaseio.com",
projectId: "rellapp-32f06",
storageBucket: "rellapp-32f06.appspot.com",
messagingSenderId: "120257049012"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

console.log(moment().format('MM/DD/YY, hh:mm a'));

database.ref().on("child_added", function(childSnapshot) {
    console.log("name: "+childSnapshot.val().name);
    console.log("destination: "+childSnapshot.val().destination);
    console.log("firstTrainTime: "+childSnapshot.val().firstTrainTime);
    console.log("frequency: "+childSnapshot.val().frequency);

    // var unformattedNextTrain = ;
    // var nextTrain = ;
    // var unformattedMinutesAway = ;
    // var minutesAway = ;

    // Calculate the CURRENT TIME - THE START TIME. Divide the difference by the FREQUENCY and get the remainder. Subtract the REMAINDER from the FREQUENCY. That is how much time will elapse before the next train comes.

    name = childSnapshot.val().name;
    destination = childSnapshot.val().destination;
    firstTrainTime = childSnapshot.val().firstTrainTime;
    frequency = childSnapshot.val().frequency;

    var newRow = $("<tr>")
      
    newRow.html("<td>"+name+"</td><td>"+destination+"</td><td>"+firstTrainTime+"</td><td></td><td>"+frequency+"</td><td></td>");

    $("#trainTable").append(newRow);

});

var submission = function () {
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    console.log (name);
    console.log (destination);
    console.log (firstTrainTime);
    console.log (frequency);

    database.ref().push({
        name:name,
        destination:destination,
        firstTrainTime:firstTrainTime,
        frequency:frequency
    });
};

$(document).on("click","#submitButton",function(event) {
    event.preventDefault();
    console.log("boosh");
    submission();
});