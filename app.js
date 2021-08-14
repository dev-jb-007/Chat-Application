const express=require('express');
const http=require('http');
const app=express();
const ejs=require('ejs');
const passport=require('passport');
const messageGenerator=require('./utils/messageGenerator');
const usernameProvider=require('./utils/usernameProvider');
require('dotenv').config();
const server=http.createServer(app);
const session=require('express-session');
const MongoStore=require('connect-mongo');
const io=require('socket.io')(server);
const path=require('path');
const userRouter=require('./routers/userRouter');
const roomRouter=require('./routers/roomRouter');
const { Cookie } = require('express-session');
require('./config/mongoose');
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'Session-Id',
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    }),
    cookie:{
        secure:false
    }
}))
app.use(express.static(path.join(__dirname,'static')));


//View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'templates/views'));


//Routes
app.use('/users',userRouter);
app.use('/room',roomRouter);
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
})
app.use((err,req,res,next)=>{
    res.send({error:err.message}).status(err.status);
})
server.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server has started on port:${process.env.PORT} and host:${process.env.HOST}`)
});
