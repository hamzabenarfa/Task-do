const { addMinutes, format, setHours, setMinutes, isBefore, differenceInMinutes,parseISO } = require("date-fns");

function fillGaps(gaps, sortedRemainingData){
    const result = [];
     for (gap of gaps){
      
        if(gap.duration !== null){
     
           const filled= fillGap(gap.start_at,gap.end_at,gap.duration,sortedRemainingData)
            result.push(filled)
            continue
        }
        result.push(gap)
    }
    console.log(result)
}

function fillGap(start, end, duration, remainingData) {
    const res = ["array init"];
    const addedIds = new Set();

    while (remainingData.length > 0 && duration > 0) {
        const data = remainingData[0];

        if (duration - data.duration >= 0 && !addedIds.has(data.id)) {
            duration = duration - data.duration;
            res.push(data);
            addedIds.add(data.id);
        }
        remainingData.shift();
    }

    return res;
}
    



module.exports = fillGaps;