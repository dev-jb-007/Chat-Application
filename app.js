const express=require('express');
cosnt http=require('http');
const app=express();
require('dotenv').config();
const server=http.createServer(app);
cosnt io=require('socket.io')(server);
const path=require('path');

app.set('view engine','hbs');

io.on('connection',(socket)=>{
  console.log('Socket Server Joined');
})
server.listen(process.env.PORT,process.env.HOST);
