// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDSO7sevmaBx431uKhDtj7gPB-9rzKF8KM",
    authDomain: "train-scheduler-afe7c.firebaseapp.com",
    databaseURL: "https://train-scheduler-afe7c.firebaseio.com",
    projectId: "train-scheduler-afe7c",
    storageBucket: "",
    messagingSenderId: "423852218050",
    appId: "1:423852218050:web:ebb5838cb2bb129f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

$("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH: mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency-remainder;
    var arrival = moment().add(minutes,"m").format("HH:mm A");
})
