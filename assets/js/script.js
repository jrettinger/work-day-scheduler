// Display Current Date
var todayDate = moment().format('dddd, MMM Do YYYY');
$("#currentDay").html(todayDate);

$(document).ready(function () {
    // saveBtn click listener  
  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
// Savesin local storage
      localStorage.setItem(time, text);
    })
   
    function timeTracker() {
        //Gets current time
        var timeNow = moment().hour();
    // Loops over the time blocks
          $(".time-block").each(function () {
          var blockTime = parseInt($(this).attr("id").split("hour")[1]);
    // Checks the current time and adds classes for backgrounds based off time
            if (blockTime < timeNow) {
                $(this).removeClass("future");
                $(this).removeClass("present");
                $(this).addClass("past");
            }
            else if (blockTime === timeNow) {
                $(this).removeClass("past");
                $(this).removeClass("future");
                $(this).addClass("present");
            }
            else {
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");
    
            }
        })
    }
    
    