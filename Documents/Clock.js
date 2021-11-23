//Assign current time in ms to timeMS since January 1st 1970 using Date.now() needs to be declared in global scope to be read by amPMConversion()
let timeMS = new Date(Date.now());
let hour = timeMS.getHours();

//use Date methods to get date data and assign to variables
function getTime() {
  amPmConversion(true);
  //Update all functions when called by SetInterval
  let year = timeMS.getFullYear();
  //+1 for month as it returns a number between 0-11
  let month = timeMS.getMonth() + 1;
  let day = timeMS.getDate();
  let minute = timeMS.getMinutes();
  let second = timeMS.getSeconds();
  console.log(`${month} / ${day} / ${year}`);
  console.log(`${hour} : ${minute} : ${second} ${amPM}`);
  /* Update timeMS and hour function when called by SetInterval. Without recalling the hour function to update if amPmConversion is enabled it
  will reset back to AM from PM after the first second. hour also is defined outside of the function so it is in the Global Scope to be read by
  the amPmConversion function. */
  timeMS = new Date(Date.now());
  hour = timeMS.getHours();
}

/*
Simple function check hour and converts to AM/PM time in Ui this will be given
as option for now in console this can be enabled or disabled by the variable
'amPmEnabled'.
*/
let amPM = "";

function amPmConversion(amPMEnabled) {
  if (amPMEnabled) {
    if (hour < 12) {
      amPM = "AM";
    } else if (hour === 12) {
      amPM = "PM";
    } else if (hour > 12) {
      hour -= 12;
      amPM = "PM";
    }
  }
}

//Running the program logging the Time and Date to the console.
setInterval(getTime, 1000);
