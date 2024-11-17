const express = require('express');
const userRouter = require('./routes/userRouter');

const server = express();
server.use(express.json());

server.use('/users', userRouter);

server.listen(4200, () => {
  console.log('SERVER IS RUNNING on port 4200');
});
