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

var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH: mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();
})
