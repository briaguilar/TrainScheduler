$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyAmHvI0abfvCXNsBRo4g2eXwOaQjsFoRZA",
        authDomain: "trainscheduler-20429.firebaseapp.com",
        databaseURL: "https://trainscheduler-20429.firebaseio.com",
        projectId: "trainscheduler-20429",
        storageBucket: "trainscheduler-20429.appspot.com",
        messagingSenderId: "552869575601",
        appId: "1:552869575601:web:51134180096eae5d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    var currentTime = moment();
    $("#clock").append(moment(currentTime).format("HH:mm"));


    $("button").on("click", function (event) {
        event.preventDefault();


        var userName = $("#name").val().trim();
        var trainName = $("#row1").append("<div class='col-md-2'>" + userName + "</div>");


        var userDestination = $("#destination").val().trim();
        var destinationName = $("#row1").append("<div class='col-md-2'>" + userDestination + "</div>")


        // First user train time   
        var firstTime = $("#trainTime").val().trim();
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);


        // Frequency input form user
        var userFrequency = $("#frequency").val().trim();
        $("#row1").append("<div class='col-md-2'>" + userFrequency + " min</div>");


        // Current Time
        currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


        //Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);


        // Time apart(remainder)
        var timeRemainder = diffTime % userFrequency;
        console.log(timeRemainder);


        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
        $("#row1").append("<div class='col-md-2'>" + moment(nextTrain).format("HH:mm") + "</div>");



        // Minute Until Train
        var tMinutesTillTrain = userFrequency - timeRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        $("#row1").append("<div class='col-md-2'>" + tMinutesTillTrain + "</div>");
    })


})