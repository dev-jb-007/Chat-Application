const express=require('express');
const http=require('http');
const app=express();
const messageGenerator=require('./utils/messageGenerator');
const usernameProvider=require('./utils/usernameProvider');
require('dotenv').config();
const server=http.createServer(app);
const io=require('socket.io')(server);
const path=require('path');
const hbs=require('hbs');
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'templates/views'));
hbs.registerPartials(path.join(__dirname,'templates/partial'))
app.use(express.static(path.join(__dirname,'static')))
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/chat',(req,res)=>{
    res.render('chat')
})

io.on('connection',(socket)=>{
  socket.on('join',(obj)=>{
      socket.join(obj.room);
      socket.emit('welcomeGreeting',messageGenerator(obj.username,`Welcome ${obj.username}`));
      socket.broadcast.to(obj.room).emit('userjoined',usernameProvider(obj.username));
  })
  socket.on('disconnect',()=>{
      socket.broadcast('userleft',()=>{
          
      })
  })
})
server.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server has started on port:${process.env.PORT} and host:${process.env.HOST}`)
});
