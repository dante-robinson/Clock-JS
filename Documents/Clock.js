/*
Declare variables to keep track of seconds, minutes, hours and days...

This is very confusing and there is probably a better way to do this but only
knowing really the Basics this is what I came up with.

Date.now() is a method that returns the number a milliseconds since January 1
1970 at midnight.

year - Since Date.now() wont be able to grab milliseconds before 1970 I started
with 1970 + Math.floor will round the total down (eg. writing in October it returns
.5 of a year using .round would round this value up to 2022 when in fact its not)
I then used Date.now() to grab the milliseconds time since 1970 and divded it by
total milliseconds in a year.

day, hour, minute and second - Same concept as figuring out the year however 1970
plays no affect here because the days reset every year that passes. I am using
the Modulus function to get rid of all the days between 1970 and the current year.

 Made them all into functions to be called later in the program to update the
 time.
*/
let year = null;
let day = null;
let hour = null;
let minute = null;
let second = null;
let isLeapYear = false;
let leapYears = null;

function yearFunction() {
  year = 1970 + Math.floor(Date.now() / 31557600000);
  return year;
}

function dayFunction() {
  day = Math.floor((Date.now() / 86400000) % 365);
  //On New Years Day, 'day' will be 0 this statement fixes that
  if (day === 0) {
    day = 1;
  }
  return day;
}

function hourFunction() {
  hour = Math.floor((Date.now() / 3600000) % 24);
  return hour;
}

function minuteFunction() {
  minute = Math.floor((Date.now() / 60000) % 60);
  return minute;
}

function secondFunction() {
  second = Math.floor((Date.now() / 1000) % 60);
  return second;
}

//Use Modulus to check if year will equal 0, if 0 isLeapYear is created true
function totalLeapYears() {
  leapYears = year - 1972;
  leapYears = Math.floor((leapYears /= 4));

  //Sets the isLeapYear variable to true to get the month.
  if (year % 4 === 0) {
    isLeapYear = true;
  }
}

/*
This is a function that takes the total leap years (years with 366 days) and
subtracts that number from days to get the correct day. The if else statement is
just for checking if the month is January and if it needs to roll the year back
to get the correct date.
*/
function dayMinusLeapYears() {
  if (day < leapYears) {
    let x = 0;
    do {
      day -= 1;
      x += 1;
    } while (day >= 0);
    leapYears -= x;
    year -= 1;
    totalLeapYears();
    isLeapYear ? (day = 366) : (day = 365);
    day -= leapYears;
  } else if (day === leapYears) {
    day = 1;
  } else {
    day -= leapYears;
  }
}

/*
I tried to make this into a switch statement however I couldnt get the `day < value`
to work at all so I changed it to an if and else if statement. It ends up being
less lines and the readability is the same I thought about creating a function
for this but I think it will end up being close to the same length (not tested)
due to having to check all the days, maybe this is something I will look into in
the future. I just didnt see a need at this time making a function that will only
be called a single time.
*/
let currentMonth = undefined;

function getMonth() {
  if (day <= 31 && day > 1) {
    currentMonth = "January";
  } else if (day <= 59 || (isLeapYear && day <= 60 && day > 31)) {
    currentMonth = "February";
    day -= 31;
  } else if (day <= 90 || (isLeapYear && day <= 91 && day >= 60)) {
    currentMonth = "March";
    isLeapYear ? (day -= 60) : (day -= 59);
  } else if (day <= 120 || (isLeapYear && day <= 121 && day >= 91)) {
    currentMonth = "April";
    isLeapYear ? (day -= 91) : (day -= 90);
  } else if (day <= 151 || (isLeapYear && day <= 152 && day >= 121)) {
    currentMonth = "May";
    isLeapYear ? (day -= 121) : (day -= 121);
  } else if (day <= 181 || (isLeapYear && day <= 182 && day >= 152)) {
    currentMonth = "June";
    isLeapYear ? (day -= 152) : (day -= 151);
  } else if (day < 212 || (isLeapYear && day < 213 && day > 182)) {
    currentMonth = "July";
    isLeapYear ? (day -= 182) : (day -= 181);
  } else if (day <= 243 || (isLeapYear && day <= 244 && day >= 213)) {
    currentMonth = "August";
    isLeapYear ? (day -= 212) : (day -= 213);
  } else if (day <= 273 || (isLeapYear && day <= 274 && day >= 244)) {
    currentMonth = "September";
    isLeapYear ? (day -= 244) : (day -= 243);
  } else if (day <= 304 || (isLeapYear && day <= 305 && day >= 274)) {
    currentMonth = "October";
    isLeapYear ? (day -= 274) : (day -= 273);
  } else if (day <= 334 || (isLeapYear && day <= 335 && day >= 305)) {
    currentMonth = "November";
    isLeapYear ? (day -= 305) : (day -= 304);
  } else if (day <= 365 || (isLeapYear && day <= 366 && day >= 335)) {
    currentMonth = "December";
    isLeapYear ? (day -= 335) : (day -= 334);
  }
}

/* timeZoneConversion is adjusted forward or backward depending on user's
selected Timezone. I also added a few extra if-else statements in the case that
a user happens check the time on New Years chagning the year back as the year
hasnt changed over for them yet, the statements also check if the previous year
is a leap year, I didnt add the leapYear() function to the time changing upward
as the user is unlikely to sit on the clock webpage for 60 days without refreshing
the page (to re-run the function) to notice that February 29th doesnt exist.

Currently this needs to be set manually until I learn more about the DOM and
revise this to have a UI. In it's current state just change the 0 to your time
difference from UTC for example EST would be -4.
*/
let timeZoneConversion = (0);

function timeZone() {
  if (timeZoneConversion > 1) {
    hour += timeZoneConversion;
    if (hour >= 24) {
      day += 1;
      if (day > 366 || (!isLeapYear && day > 365)) {
        year += 1;
      }
    }
  } else if (timeZoneConversion < 1) {
    hour += timeZoneConversion;
    if (hour < 0) {
      day -= 1;
      if (day < 0) {
        year -= 1;
        totalLeapYears();
        isLeapYear ? (day = 366) : (day = 365);
      }
    }
  }
}

/*
Simple function check hour and converts to AM/PM time in Ui this will be given
as option for now in console this can be enabled or disabled by the variable
'amPmEnabled'.
*/
let amPmEnabled = true;

function amPmConversion() {
  if (hour < 12) {
    amPm = "AM";
  } else if (hour === 12) {
    amPm = "PM";
  } else if (hour > 12) {
    hour -= 12;
    amPm = "PM";
  }
}

var oneSecond = 1000;

setInterval (clockFunctions, oneSecond);

//Running the program logging the Time and Date to the console.
function clockFunctions() {
  yearFunction();
  dayFunction();
  totalLeapYears();
  dayMinusLeapYears();
  hourFunction();
  minuteFunction();
  secondFunction();
  timeZone();
  getMonth();
  if (amPmEnabled) {
    amPmConversion();
  }
  console.log(`${currentMonth} / ${day} / ${year}`);
  console.log(`${hour} : ${minute} : ${second} ${amPm}`);
}

console.log(Date.now())