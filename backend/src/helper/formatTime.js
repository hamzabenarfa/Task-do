const {parse ,format} = require('date-fns');

function parseTime(time) {
    return parse(time, 'HH:mm', new Date());
}

function formatTime(time) {
    return format(parseTime(time), 'HH:mm');
}

module.exports = formatTime;