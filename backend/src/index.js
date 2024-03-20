const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

const authenticateToken = require('./middleware/authenticationToken');

const taskRouter = require('./routes/task');
const operationalHoursRouter = require('./routes/operationalHours');
const scheduleRouter = require('./routes/schedule');
const userRouter = require('./routes/auth');

app.use('/task', authenticateToken,taskRouter);
app.use('/operationalhours',authenticateToken, operationalHoursRouter);
app.use('/schedule',authenticateToken, scheduleRouter);
app.use('/auth', userRouter);

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`),
);


