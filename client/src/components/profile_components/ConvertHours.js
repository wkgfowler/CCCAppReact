const convertToNormalHours = (time) => {
    if (time === "Closed") {
        return time;
    } else {
        if (time[0] === '0') {
            time.replace(time[0], "")
            time += "am"
            return time;
    }
}

export default convertToNormalHours;