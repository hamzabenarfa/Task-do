const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

const taskRouter = require('./routes/task');
const operationalHoursRouter = require('./routes/operationalHours');
const scheduleRouter = require('./routes/schedule');
const userRouter = require('./routes/Auth');

app.use('/task', taskRouter);
app.use('/operationalhours', operationalHoursRouter);
app.use('/schedule', scheduleRouter);
app.use('/auth', userRouter);

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`),
);