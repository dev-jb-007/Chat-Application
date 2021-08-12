const usernameProvider=(username)=>{
    return{
        username,
        createdAt:new Date().now
    }
}
module.exports=usernameProvider;
