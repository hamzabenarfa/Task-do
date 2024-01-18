const { addMinutes, format, setHours, setMinutes, isBefore, differenceInMinutes,parseISO } = require("date-fns");

function fillGaps(gaps, sortedRemainingData){
    
     for (gap of gaps){
      
        if(gap.duration !== null){
            console.log(gap.duration)
            console.log(gap.id)
            fillGap(gap.start_at,gap.end_at,gap.duration,sortedRemainingData)
            console.log("--------------")
        }
    }
    
}

function fillGap(start, end, duration, remainingData) {
    const res = [];
    const addedIds = new Set();

    while (remainingData.length > 0 && duration > 0) {
        const data = remainingData[0];
        if (duration - data.duration >= 0 && !addedIds.has(data.id)) {
            duration = duration - data.duration;
            res.push(data);
            addedIds.add(data.id);
        }
        remainingData.shift(); // Remove the first element
    }

    console.log(res);
}
    



module.exports = fillGaps;