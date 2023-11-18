export const OPENHOURS = [
    { value: "Closed", display: "Closed" },
    { value: "0500", display: "5am" },
    { value: "0530", display: "530am" },
    { value: "0600", display: "6am" },
    { value: "0630", display: "630am" },
    { value: "0700", display: "7am" },
    { value: "0730", display: "730am" },
    { value: "0800", display: "8am" },
    { value: "0830", display: "830am" },
    { value: "0900", display: "9am" },
    { value: "0930", display: "930am" },
    { value: "1000", display: "10am" },
    { value: "1030", display: "1030am" },
    { value: "1100", display: "11am" },
    { value: "1130", display: "1130am" },
    { value: "1200", display: "12pm" },
    { value: "1230", display: "1230pm" },
    { value: "1300", display: "1pm" },
    { value: "1330", display: "130pm" },
    { value: "1400", display: "2pm" },
    { value: "1430", display: "230pm" },
    { value: "1500", display: "3pm" },
    { value: "1530", display: "330pm" },
    { value: "1600", display: "4pm" },
    { value: "1630", display: "430pm" },
    { value: "1700", display: "5pm" },
    { value: "1730", display: "530pm" },
    { value: "1800", display: "6pm" },
    { value: "1830", display: "630pm" },
    { value: "1900", display: "7pm" },
    { value: "1930", display: "730pm" },
    { value: "2000", display: "8pm" },
    { value: "2030", display: "830pm" },
    { value: "2100", display: "9pm" }
];

export const CLOSEHOURS = [
    { value: 'Closed', display: 'Closed' },
    { value: '0900', display: '9am' },
    { value: '0930', display: '930am' },
    { value: '1000', display: '10am' },
    { value: '1030', display: '1030am' },
    { value: '1100', display: '11am' },
    { value: '1130', display: '1130am' },
    { value: '1200', display: '12pm' },
    { value: '1230', display: '1230pm' },
    { value: '1300', display: '1pm' },
    { value: '1330', display: '130pm' },
    { value: '1400', display: '2pm' },
    { value: '1430', display: '230pm' },
    { value: '1500', display: '3pm' },
    { value: '1530', display: '330pm' },
    { value: '1600', display: '4pm' },
    { value: '1630', display: '430pm' },
    { value: '1700', display: '5pm' },
    { value: '1730', display: '530pm' },
    { value: '1800', display: '6pm' },
    { value: '1830', display: '630pm' },
    { value: '1900', display: '7pm' },
    { value: '1930', display: '730pm' },
    { value: '2000', display: '8pm' },
    { value: '2030', display: '830pm' },
    { value: '2100', display: '9pm' },
    { value: '2130', display: '930pm' },
    { value: '2200', display: '10pm' },
    { value: '2230', display: '1030pm' },
    { value: '2300', display: '11pm' },
    { value: '2330', display: '1130pm' },
    { value: '0000', display: '12am' },
    { value: '0030', display: '1230am' },
    { value: '0100', display: '1am' },
    { value: '0130', display: '130am' },
    { value: '0200', display: '2am' }
];

export const STARTHOURS = [
    { value: "Open", display: "Open"},
    { value: "0500", display: "5am" },
    { value: "0530", display: "530am" },
    { value: "0600", display: "6am" },
    { value: "0630", display: "630am" },
    { value: "0700", display: "7am" },
    { value: "0730", display: "730am" },
    { value: "0800", display: "8am" },
    { value: "0830", display: "830am" },
    { value: "0900", display: "9am" },
    { value: "0930", display: "930am" },
    { value: "1000", display: "10am" },
    { value: "1030", display: "1030am" },
    { value: "1100", display: "11am" },
    { value: "1130", display: "1130am" },
    { value: "1200", display: "12pm" },
    { value: "1230", display: "1230pm" },
    { value: "1300", display: "1pm" },
    { value: "1330", display: "130pm" },
    { value: "1400", display: "2pm" },
    { value: "1430", display: "230pm" },
    { value: "1500", display: "3pm" },
    { value: "1530", display: "330pm" },
    { value: "1600", display: "4pm" },
    { value: "1630", display: "430pm" },
    { value: "1700", display: "5pm" },
    { value: "1730", display: "530pm" },
    { value: "1800", display: "6pm" },
    { value: "1830", display: "630pm" },
    { value: "1900", display: "7pm" },
    { value: "1930", display: "730pm" },
    { value: "2000", display: "8pm" },
    { value: "2030", display: "830pm" },
    { value: "2100", display: "9pm" }
];

export const formatStartHoursValue = (val) => {
    let startHours = STARTHOURS;
    let obj = startHours.find(hour => hour.display === val)
    return obj
}

export const ENDHOURS = [
    { value: "Close", display: "Close"},
    { value: '0900', display: '9am' },
    { value: '0930', display: '930am' },
    { value: '1000', display: '10am' },
    { value: '1030', display: '1030am' },
    { value: '1100', display: '11am' },
    { value: '1130', display: '1130am' },
    { value: '1200', display: '12pm' },
    { value: '1230', display: '1230pm' },
    { value: '1300', display: '1pm' },
    { value: '1330', display: '130pm' },
    { value: '1400', display: '2pm' },
    { value: '1430', display: '230pm' },
    { value: '1500', display: '3pm' },
    { value: '1530', display: '330pm' },
    { value: '1600', display: '4pm' },
    { value: '1630', display: '430pm' },
    { value: '1700', display: '5pm' },
    { value: '1730', display: '530pm' },
    { value: '1800', display: '6pm' },
    { value: '1830', display: '630pm' },
    { value: '1900', display: '7pm' },
    { value: '1930', display: '730pm' },
    { value: '2000', display: '8pm' },
    { value: '2030', display: '830pm' },
    { value: '2100', display: '9pm' },
    { value: '2130', display: '930pm' },
    { value: '2200', display: '10pm' },
    { value: '2230', display: '1030pm' },
    { value: '2300', display: '11pm' },
    { value: '2330', display: '1130pm' },
    { value: '0000', display: '12am' },
    { value: '0030', display: '1230am' },
    { value: '0100', display: '1am' },
    { value: '0130', display: '130am' },
    { value: '0200', display: '2am' }
];

export const formatEndHoursValue = (val) => {
    let endHours = ENDHOURS;
    let obj = endHours.find(hour => hour.display === val)
    return obj
}

export const formatSpecialEventDays = (arr) => {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    if (arr.length === 1) {
        return weekdays[arr[0]]
    } else if (arr.length > 1 && arr.length <= 2) {
        return `${weekdays[arr[0]]} and ${weekdays[arr[1]]}`
    } else if (arr.length >= 3) {
        let str = ""
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr[arr.length-1]) {
                str += weekdays[arr[i]] + ", "
            } else {
                str += "and " + weekdays[arr[i]]
                return str
            }
        }
    }
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatMonth = (num) => {
    let days = [];
    for (let i = 1; i <= num; i++) {
        days.push(i)
    }
    return days;
}

export const formatLastMonth = (day, date) => {
    let days = [];
    for (let i = day; i > 0; i--) {
        days.push(date - i + 1)
    }
    return days
}

export const formatNextMonth = (day) => {
    let days = [];
    for (let i = day; i < 6; i++) {
        days.push(i - day + 1)
    }
    return days
}

export const formatDateDay = (year, month, date) => {
    let day = new Date(year, month, date).getDay();
    return day
}

export const formatDateMonth = (month) => {
    month += 1
    if (month < 10) {
        month = `0${month}`
        return month
    } else {
        return month
    }
}

export const formatDateDate = (date) => {
    if (date < 10) {
        date = `0${date}`
        return date;
    } else {
        return date
    }
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const formatAddressGeocode = (str) => {
    let splitString = str.split(" ");
    if (splitString.length > 1) {
        let formattedAddress = ""
        for (let i = 0; i < splitString.length; i++) {
            if (i !== splitString.length - 1) {
                formattedAddress += `${splitString[i]}+`
            } else {
                formattedAddress += splitString[i]
            }
        return formattedAddress
        }
    }
    return str
}

export const MENUTYPES = [
    "Menu", "Breakfast Menu", "Lunch Menu", "Dinner Menu", "Brunch Menu", "Bar Menu"
]

export const MENUSTARTHOURS = [
    {value: "1", display: "1"},
    {value: "2", display: "2"},
    {value: "3", display: "3"},
    {value: "4", display: "4"},
    {value: "5", display: "5"},
    {value: "6", display: "6"},
    {value: "7", display: "7"},
    {value: "8", display: "8"},
    {value: "9", display: "9"},
    {value: "10", display: "10"},
    {value: "11", display: "11"},
    {value: "12", display: "12"},
    {value: "Open", display: "Open"}
]

export const MENUENDHOURS = [
    {value: "1", display: "1"},
    {value: "2", display: "2"},
    {value: "3", display: "3"},
    {value: "4", display: "4"},
    {value: "5", display: "5"},
    {value: "6", display: "6"},
    {value: "7", display: "7"},
    {value: "8", display: "8"},
    {value: "9", display: "9"},
    {value: "10", display: "10"},
    {value: "11", display: "11"},
    {value: "12", display: "12"},
    {value: "Close", display: "Close"}
]

export const MENUMINUTES = [
    {value: "00", display: "00"},
    {value: "15", display: "15"},
    {value: "30", display: "30"},
    {value: "45", display: "45"}
]

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const WEEKDAYSVALUES = [
    {day: "sunday", value: 0},
    {day: "monday", value: 1},
    {day: "tuesday", value: 2},
    {day: "wednesday", value: 3},
    {day: "thursday", value: 4},
    {day: "friday", value: 5},
    {day: "saturday", value: 6}
]

export const formatMenuTime = (startTime, endTime, AMPM) => {
    if (endTime === "" && AMPM === "") {
        return startTime
    } else {
        return `${startTime}:${endTime}${AMPM}`
    }
}

export const formatMenuDayAvailability = (array) => {
    const arr = array.filter(x => x);
    console.log(arr)
    if (arr.length === 1) {
        return arr
    } else if (arr.length > 1 && arr.length <= 2) {
        return `${arr[0]} and ${arr[1]}`
    } else if (arr.length >= 3) {
        let str = ""
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr[arr.length-1]) {
                str += arr[i] + ", "
            } else {
                str += "and " + arr[i]
                return str
            }
        }
    }
}

export const determineIsRecurring = (x) => {
    if (x === "Upcoming Specials") {
        return false
    } else {
        return true
    }
}

export const TOWNS = ["Atlantic Beach", "Beaufort", "Morehead City", "Emerald Isle", "Swansboro"];

export const formatWhatIsOpenTime = (hour, minute) => {
    if (hour.length === 1) {
        hour = `0${hour}`
    }
    if (minute.length === 1) {
        minute = `0${minute}`
    }
    return `${hour}${minute}`
}

export const convertToNormalHours = (time) => {
    if (time === "Closed" || time === "Close" || time === "Open") {
        return time;
    } else if (time === "1200" || time === "1000" || time === "1100") {
        let newTime = "12pm"
        return newTime
    } else if (time === "1230") {
        time  += "pm"
        return time
    } else if (time === "0000") {
        let newTime = "12am"
        return newTime
    } else if (time === "0030") {
        let newTime = "1230am"
        return newTime
    } else if (time === "1000" || time === "1100") {
        let newTime = time.slice(0,2)
        newTime += "am"
        return newTime
    } else if (time === "1030" || time === "1130") {
        time += "am"
        return time
    } else if (time[0] === '0') {
        let newTime = time.replace(time[0], "")
        if (newTime[1] === '0') {
            let newerTime = newTime.replace('00', '')
            newerTime += "am"
            return newerTime
        }
        newTime += "am"
        return newTime;
    } else if ((time[0] === '1' && time[1] > 2) || time[0] === '2') {
        let newTime = time.slice(0,2)
        newTime -= 12
        let newerTime = newTime.toString()
        if (time[2] === '0') {
            newerTime += "pm"
            return newerTime
        }
        newerTime += "30pm"
        return newerTime
    }
}

export const formatDateDisplay = (date) => {
    let dateSplit = date.split("-")
    let monthSplit = Number(dateSplit[1])
    let month = months[monthSplit-1]
    return `${month} ${dateSplit[2]}`
}

export const capitalizeFirstLetter = (string) => {
    return string.replace(string[0], string[0].toUpperCase())
}

export const formatRecurringOrNot = (string) => {
    if (string === false) {
        return "Only once"
    } else {
        return "Recurring every week"
    }
}

export const determineWeekdays = (str, value) => {
    return str.includes(value)
}