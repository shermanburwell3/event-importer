const fs = require("fs");

function writeToFile(data) {
  let eventDays = "";
  for (i = 0; i < data.length; i++) {
    eventDays += `event,${data[i]},`;
  }
  fs.writeFile("event.txt", eventDays, function () {
    console.log("File has been created.");
  });
}

function getDays() {
  const today = new Date();
  const thirdWednesdays = [];

  // Loop through the next 12 months
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const month = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      1
    );

    // Find the first Wednesday of the month
    const firstWednesday = new Date(month);
    firstWednesday.setDate(1 + ((3 - firstWednesday.getDay() + 7) % 7)); // Adjust to first Wednesday

    // Calculate the third Wednesday
    const thirdWednesday = new Date(firstWednesday);
    thirdWednesday.setDate(firstWednesday.getDate() + 14); // Move to the third Wednesday

    // Format the date in MM/DD/YYYY
    const formattedDate = `${(thirdWednesday.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${thirdWednesday
      .getDate()
      .toString()
      .padStart(2, "0")}/${thirdWednesday.getFullYear()}`;
    thirdWednesdays.push(formattedDate);
  }

  return thirdWednesdays;
}

function init() {
  writeToFile(getDays());
}

init();
