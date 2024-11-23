const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})


const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter')

const connectionString = process.env.DB

mongoose.connect(connectionString).then(() =>{
  console.log('Database Connected')
}).catch(err =>{
  console.log(err)
})

const server = express();
server.use(express.json());


server.use('/users', userRouter);
server.use('/account', accountRouter)

server.listen(4200, () => {
  console.log('SERVER IS RUNNING on port 4200');
});
