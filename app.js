
//to reverse the date
function reverseStr(dateStr) {
    return dateStr.split('').reverse().join('');
}

//to check whether input is palindrome or not
function checkForPalindrome(dateStr) {
    return (dateStr === reverseStr(dateStr));
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
        dateStr.month = '0' + date.day;
    } else {
        dateStr.month = date.month.toString();
    }

    //for year of date 
    dateStr.year = date.year.toString();

    return dateStr;

}

//
var date = {
    day: 5,
    month: 9,
    year: 2020
}

console.log(converDateToString(date));