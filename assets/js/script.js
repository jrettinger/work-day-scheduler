// Display Current Date
var todayDate = moment().format('dddd, MMM Do YYYY');
$("#currentDay").html(todayDate);

$(document).ready(function () {
    //Click Listener 
    $(".saveBtn").on("click", function () {
        // Get nearby values of the description in JQuery
        var text = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");
// Saves in Local Storage
        localStorage.setItem(time, text);
    })
// Get Current Time
    function timeTracker() {
        var timeNow = moment().hour();