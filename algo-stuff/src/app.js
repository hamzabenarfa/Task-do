const data = require('./data/data.js');
const sortedData = require('./helpers/sortedData.js');
const getGaps = require('./helpers/getGaps.js');
const fillGaps = require('./helpers/fillGaps.js');
const organizeByContext = require('./helpers/organizeByContext.js');

const startingTime = 8;
const endingTime = 12;



const [sortedimportantTasks, sortedRemainingData]  = sortedData(data);

const gaps = getGaps(sortedimportantTasks, sortedRemainingData, startingTime, endingTime);

const res = fillGaps(gaps, sortedRemainingData, startingTime, endingTime);





console.log(organizeByContext(res,gaps, 'home', "8:00", "9:00"))

console.log(organizeByContext(res,gaps, 'home', "9:00", "11:00"))

// console.log(organizeByContext(gapsFilled, 'home', '10:00', '11:00'))
