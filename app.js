// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDSO7sevmaBx431uKhDtj7gPB-9rzKF8KM",
    authDomain: "train-scheduler-afe7c.firebaseapp.com",
    databaseURL: "https://train-scheduler-afe7c.firebaseio.com",
    projectId: "train-scheduler-afe7c",
    storageBucket: "train-scheduler-afe7c.appspot.com",
    messagingSenderId: "423852218050",
    appId: "1:423852218050:web:ebb5838cb2bb129f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

// Button for adding trains 
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();


//grab input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH: mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();


// hold for data temporary
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

// uplaod to database
    trainData.ref().push(newTrain);

// alert for success
    alert("Train successfully added");

//clear text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});

// firebase event for adding trains and store as var

trainData.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;

// math for time until next train
    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("HH:mm A");

// Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
    );

// Append the new row to the table
    $("#trainTable > tbody").append(newRow);
});