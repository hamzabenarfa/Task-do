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
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

app.use('/task', authenticateToken,taskRouter);
app.use('/operationalhours',authenticateToken, operationalHoursRouter);
app.use('/schedule',authenticateToken, scheduleRouter);
app.use('/user',authenticateToken, userRouter);
app.use('/auth', authRouter);

app.use('/public/images', express.static('./public/images'));

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`),
);


