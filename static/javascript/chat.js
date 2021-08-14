let socket=io();
console.log('hi');
let mainchats=document.getElementById('main-chats');
let Othermessages=chatbox.querySelector('.chat-display-messages');
let chatboxHtml=``;
const {username,room}=Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join',{username,room})
socket.on('welcomeGreeting',(Obj)=>{
    chatboxHtml=`<div class="chat-display-messages">
        <p>${Obj.text}</p>
        <ion-icon class="back-carret" name="caret-back-outline"></ion-icon>
    </div>`
    // chatboxHtml+=`<p>${message}</p>`
    mainchats.innerHTML=chatboxHtml;
})
socket.on('userjoined',(Obj)=>{
    chatboxHtml+=`<div class="chat-display-messages">
        <p>${Obj.username} Joined!!!</p>
        <ion-icon class="back-carret" name="caret-back-outline"></ion-icon>
    </div>`;
    mainchats.innerHTML=chatboxHtml;
    // chatbox.innerHTML=chatboxHtml;
})
const createRoom=async()=>{
    let roomname=document.getElementById('roomname').value;
    let roompassword=document.getElementById('roompassword').value;
    await fetch('../room/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:roomname,password:roompassword})
    })
}
// socket.on('userleft',(Obj)=>{
//     chatboxHtml+=`<div class="chat-display-messages">
//         <p>${Obj.username} Left!!!</p>
//         <ion-icon class="back-carret" name="caret-back-outline"></ion-icon>
//     </div>`;
//     mainchats.innerHTML=chatboxHtml;
// })
