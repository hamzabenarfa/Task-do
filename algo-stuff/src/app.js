const data = require('./data.js');
const sortedData = require('./helpers/sortedData.js');
const getGaps = require('./helpers/organizeSchedule.js');
const fillGaps = require('./helpers/fillGaps.js');

const startingTime = 8;
const endingTime = 17;

const [sortedMeetings, sortedRemainingData]  = sortedData(data);

const gaps = getGaps(sortedMeetings, sortedRemainingData, startingTime, endingTime);
//console.log("🚀 ~ gaps:", gaps)

const result = fillGaps(gaps, sortedRemainingData);

//console.log(result);


// Add the remaining data at the end with start_at and end_at
//   for (const remainingEvent of sortedRemainingData) {
//     const remainingStart = setHours(setMinutes(new Date(), currentTime.getMinutes()), currentTime.getHours());
//     const remainingEnd = addMinutes(remainingStart, remainingEvent.duration);
//     const eventWithTime = {
//       ...remainingEvent,
//       start_at: format(remainingStart, 'HH:mm'),
//       end_at: format(remainingEnd, 'HH:mm')
//     };
//     schedule.push(eventWithTime);
//     currentTime = remainingEnd;
//   }
