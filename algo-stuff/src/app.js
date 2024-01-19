const data = require('./data.js');
const sortedData = require('./helpers/sortedData.js');
const getGaps = require('./helpers/organizeSchedule.js');
const fillGaps = require('./helpers/fillGaps.js');

const startingTime = 8;
const endingTime = 17;

const [sortedMeetings, sortedRemainingData]  = sortedData(data);

const gaps = getGaps(sortedMeetings, sortedRemainingData, startingTime, endingTime);
//console.log("🚀 ~ gaps:", gaps)

const result = fillGaps(gaps, sortedRemainingData, startingTime, endingTime);
