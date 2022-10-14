const LS_KEY = "schedules";

function updateDateInfo() {
  let today = moment().format("MMMM Do YYYY");
  $("#currentDay").text(today);
}

function getHourStatus(hour) {
  let hourObj = {
    "9AM": 9,
    "10AM": 10,
    "11AM": 11,
    "12PM": 12,
    "1PM": 13,
    "2PM": 14,
    "3PM": 15,
    "4PM": 16,
    "5PM": 17,
  };
  hour = hourObj[hour];
  let currentHour = +moment().format("k");
  if (hour < currentHour) {
    return "past";
  } else if (hour === currentHour) {
    return "present";
  } else {
    return "future";
  }
}

function getFromLS() {
  const data = localStorage.getItem(LS_KEY);
  if (!data) {
    let obj = {
      "9AM": "",
      "10AM": "",
      "11AM": "",
      "12PM": "",
      "1PM": "",
      "2PM": "",
      "3PM": "",
      "4PM": "",
      "5PM": "",
    };
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
    return obj;
  } else {
    return JSON.parse(data);
  }
}

function saveToLS() {
  let hourElement = $(this).siblings()[0];
  let hour = $(hourElement).text();
  let descElement = $(this).siblings()[1];
  let desc = $(descElement).val();
  let dataFromLS = getFromLS();
  dataFromLS[hour] = desc;
  localStorage.setItem(LS_KEY, JSON.stringify(dataFromLS));
}

function createSingleBlock(hour) {
  let div = document.createElement("div");
  $(div).addClass("time-block row");
  let hourDiv = document.createElement("div");
  $(hourDiv).addClass(
    "hour col-md-1 justify-content-center align-items-center d-flex"
  );
  $(hourDiv).text(hour);
  let desc = document.createElement("textarea");
  $(desc).addClass("description col-md-10");
  $(desc).addClass(getHourStatus(hour));
  $(desc).attr("id", hour);
  let saveBtn = document.createElement("button");
  $(saveBtn).addClass("saveBtn col-md-1");
  $(saveBtn).html("<i class='fa-solid fa-floppy-disk'></i>");
  $(saveBtn).click(saveToLS);
  $(div).append(hourDiv, desc, saveBtn);
  return div;
}

function createTimeBlocks() {
  let workHours = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];
  workHours.forEach((hour) => $(".container").append(createSingleBlock(hour)));
}

function populateTimeBlocks() {
  let data = getFromLS();
  for (let block in data) {
    $("#" + block).text(data[block]);
  }
}

function main() {
  updateDateInfo();
  createTimeBlocks();
  populateTimeBlocks();
}

$(document).ready(main);
