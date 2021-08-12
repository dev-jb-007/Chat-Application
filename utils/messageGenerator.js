const messageGenerator=(username,text)=>{
    return{
        username,
        text,
        createdAt:new Date().now
    }
}
module.exports=messageGenerator;
