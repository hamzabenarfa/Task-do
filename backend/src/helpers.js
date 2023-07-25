function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
  
function convertToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const hourString = hours < 10 ? '0' + hours : hours;
    const minuteString = (minutes % 60) < 10 ? '0' + (minutes % 60) : minutes % 60;
    return `${hourString}:${minuteString}`;
}

module.exports = { convertToMinutes, convertToTime };