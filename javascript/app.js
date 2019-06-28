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


    var database = firebase.database();


    var currentTime = moment();
    $("#clock").append(moment(currentTime).format("HH:mm"));


    



    $("button").on("click", function (event) {
        event.preventDefault();


        // Grabbing user input
        var userName = $("#name").val().trim();
        var userDestination = $("#destination").val().trim();
        var firstTime = $("#trainTime").val().trim();
        var userFrequency = $("#frequency").val().trim();


        // Creating local "temporary" object for holding train data
        var newTrainInput = {
            name: userName,
            destination: userDestination,
            firstTrainTime: firstTime,
            frequency: userFrequency
        };

        // Uploading to databse
        database.ref().push(newTrainInput);


        // First user train time   
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        currentTime = moment();

        //Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart(remainder)
        var timeRemainder = diffTime % userFrequency;

        // Minute Until Train
        var tMinutesTillTrain = userFrequency - timeRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");


        // Creating the new row
        var newRow = $("<tr>").append(
            $("<td>").append(userName),
            $("<td>").append(userDestination),
            $("<td>").append(userFrequency + " min"),
            $("<td>").text((nextTrain).format("HH:mm")),
            $("<td>").append(tMinutesTillTrain)
        );

        $("#train-table > tbody").append(newRow);


        $("#name").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");


        database.ref().on("value", function (snapshot) {
            console.log(userName);

            userName = snapshot.val().userName;
        })
    })
})