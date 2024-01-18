const { setHours, setMinutes, isBefore, isAfter } = require("date-fns");

function sortedData(data) {
  const meetings = [];
  const remainingData = [];

  for (const i of data) {
    if (i.start_at !== undefined) {
      meetings.push(i);
    } else {
      remainingData.push(i);
    }
  }

  const sortedMeetings = meetings.sort((a, b) => {
    if (a.start_at && b.start_at) {
      const [aHours, aMinutes] = a.start_at.split(":");
      const [bHours, bMinutes] = b.start_at.split(":");

      const aTime = setHours(setMinutes(new Date(), aMinutes), aHours);
      const bTime = setHours(setMinutes(new Date(), bMinutes), bHours);

      if (isBefore(aTime, bTime)) {
        return -1;
      } else if (isAfter(aTime, bTime)) {
        return 1;
      }
    }

    return 0;
  });

  const sortedRemainingData = remainingData.sort((a, b) => {
    // First, sort by priority
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    
    // If priorities are equal, then sort by duration (least duration first)
    return a.duration - b.duration;
  });

  //return sortedMeetings.concat(remainingData);
  return [sortedMeetings, sortedRemainingData];
}

module.exports = sortedData;
