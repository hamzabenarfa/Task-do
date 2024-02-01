const parseTime = require("./parseTime.js");

function compareByStartTime(a, b) {
  const aTime = parseTime(a.start_at);
  const bTime = parseTime(b.start_at);

  return aTime - bTime;
}

function sortedData(data) {
  const meetings = data.filter(item => item.start_at !== undefined);
  const sortedMeetings = meetings.sort(compareByStartTime);

  const remainingData = data.filter(item => item.start_at === undefined);
  const sortedRemainingData = remainingData.sort((a, b) => {
    return a.priority - b.priority || a.duration - b.duration;
  });

  return [sortedMeetings, sortedRemainingData];
}

module.exports = sortedData;
