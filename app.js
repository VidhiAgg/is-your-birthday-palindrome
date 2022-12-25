var dateInput = document.querySelector("#bday-input");
var submitButton = document.querySelector("#showResult");
var output = document.querySelector("#output");

function clickHandler() {
    var dateInputStr = dateInput.value;
    if (dateInputStr !== '') {
        var date_list = dateInputStr.split('-');

        var date = {
            day: Number(date_list[2]),
            month: Number(date_list[1]),
            year: Number(date_list[0])
        };
        console.log(date);
        var isInputDatePalindrome = checkPalindromeForDateVariation(date);
        if (isInputDatePalindrome) {
            output.innerText = "Its Palindrome!"
        } else {
            var [FwdNumberOfDays, nextDate] = getNextPalindromeDate(date);
            var [backNumberOfDays, previousDate] = getPreviousPalindromeDate(date);
            var daySetter = ((FwdNumberOfDays <=1) ||(backNumberOfDays <= 1)) ? ' day' : ' days';
            output.innerText = (FwdNumberOfDays < backNumberOfDays) ? `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, and is ahead by ${FwdNumberOfDays} ${daySetter}. ` : `The nearest palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed that by ${backNumberOfDays} ${daySetter}. `;
        }
    }
}


submitButton.addEventListener("click", clickHandler);




//to reverse the date
function reverseStr(dateStr) {
    var listOfChars = dateStr.split('');
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join('');
    return reversedString;
}

//to check whether input is palindrome or not
function checkForPalindrome(dateStr) {
    var reversedString = reverseStr(dateStr);
    return (dateStr === reversedString);
}

//convert date to string
function converDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }
    //for day of date 
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    //for month of date 
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    //for year of date 
    dateStr.year = date.year.toString();

    return dateStr;

}

//to return all variations of date
//this is done to get all variations, so that we don't miss any case
function getDateVariations(date) {
    var dateStr = converDateToString(date);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;

    return [yymmdd, mmddyy, ddmmyy, yyyymmdd, mmddyyyy, ddmmyyyy];
}

//will check whether date variations is palindrome or not
function checkPalindromeForDateVariation(date) {
    var dateVariations_list = getDateVariations(date);
    var isPalindrome = false; //default value
    for (var i = 0; i < dateVariations_list.length; i++) {
        if (checkForPalindrome(dateVariations_list[i])) {
            isPalindrome = true;
            break;
        }

    }

    return isPalindrome;
}

function isLeapYear(dateYear) {
    var year = dateYear;
    var isLeapYear = false;
    if ((year % 4 === 0 && year % 100 != 0) || (year % 400 === 0)) {
        isLeapYear = true;
    }
    return isLeapYear;

}

//to find the next date
function findNextDate(date) {
    var dayy = date.day + 1
    var month = date.month;
    var year = date.year;
    //this array consist of last date of ever month from january to december
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //if month is february //check whether the year is leap or not
    if (month === 2) {
        if (isLeapYear(year)) {
            //days will be 29
            if (dayy > 29) {
                dayy = 1;
                month++;
            }
        } else {
            //days will be 28
            if (dayy > 28) {
                dayy = 1;
                month++;
            }
        }
    } else {
        if (dayy > daysInMonth[month - 1]) {
            dayy = 1;
            month++;
        }

    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: dayy,
        month: month,
        year: year
    };
}

// to get next palindrome date and by how many days it missed
function getNextPalindromeDate(date) {
    var nextDate = findNextDate(date);
    var numberOfDays = 0;
    while (1) {
        numberOfDays++;
        var isDatePalindrome = checkPalindromeForDateVariation(nextDate);
        console.log(isDatePalindrome);
        if (isDatePalindrome) {
            break;
        }
        nextDate = findNextDate(nextDate);

    }

    return [numberOfDays, nextDate];

}


//to find the next date
function findPreviousDate(date) {
    var dayy = date.day - 1;
    var month = date.month;
    var year = date.year;
    //this array consist of last date of ever month from january to december
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dayy === 0) {
        month--;
        if (month === 0) {
            month = 12;
            dayy = 31;
            year--;
        }
        //if month is february //check whether the year is leap or not
        else if (month === 2) {
            if (isLeapYear(year)) {
                dayy = 29;

            } else {
                dayy = 28;
            }
        } else {
            dayy = daysInMonth[month - 1];
        }
    }
    return {
        day: dayy,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date) {
    var previousDate = findPreviousDate(date);
    var numberOfDays = 0;
    while (1) {
        numberOfDays++;
        var isDatePalindrome = checkPalindromeForDateVariation(previousDate);
        if (isDatePalindrome) {
            break;
        }
        previousDate = findPreviousDate(previousDate);

    }

    return [numberOfDays, previousDate];

}

//to get next palindrome date
// var date = {
//     day: 21,
//     month: 2,
//     year: 2022
// }

//console.log(getNextPalindromeDate(date));
