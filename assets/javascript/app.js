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

database.ref().on("child_added", function(childSnapshot) {

    // Calculate the CURRENT TIME - THE START TIME. Divide the difference by the FREQUENCY and get the remainder. Subtract the REMAINDER from the FREQUENCY. That is how much time will elapse before the next train comes.

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format('HH:mm'));

    var startTimeConverted = moment(childSnapshot.val().firstTrainTime,'HH:mm').subtract(24,'hours');
    console.log("train start time: " + moment(startTimeConverted).format('HH:mm'));

    var frequencyMin = childSnapshot.val().frequency;
    console.log("frequency: " + frequencyMin);

    var difference = moment().diff(moment(startTimeConverted),"minutes")
    console.log("difference in mins: " + difference);

    var remainder = difference%frequencyMin;
    console.log("remainder: " + remainder);

    var minutesRemaining = frequencyMin-remainder;
    console.log("minutes until next train: " + minutesRemaining);

    var nextTrain = moment(moment().add(minutesRemaining, 'minutes')).format('HH:mm');
    console.log(nextTrain);

    console.log("------------")

    name = childSnapshot.val().name;
    destination = childSnapshot.val().destination;
    firstTrainTime = childSnapshot.val().firstTrainTime;
    frequency = childSnapshot.val().frequency;

    var newRow = $("<tr>")
      
    newRow.html("<td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+nextTrain+"</td><td>"+minutesRemaining+"</td>");

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