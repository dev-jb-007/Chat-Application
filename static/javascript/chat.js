let socket=io();
console.log('hi');
let chatbox=document.getElementById('chatbox');
let chatboxHtml=``;
const {username,room}=Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join',{username,room})
socket.on('welcomeGreeting',(message)=>{
    console.log('welcome');
    // chatboxHtml+=`<p>${message}</p>`
    // chatbox.innerHTML=chatboxHtml;
})
socket.on('userjoined',(obj)=>{
    console.log('hi');
    // chatboxHtml+=`<span>${obj.username} joined</span> -<span>${moment(obj.createdAt).format('h:m a')}</span>`
    // chatbox.innerHTML=chatboxHtml;
})
