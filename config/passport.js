const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/users');
const validation=async (username,password,done)=>{
    try{
        const user=await User.findOne({username});
        if(!user)
        {
            done(null,false);
        }
        else{
            if(user.password===password)
            {
                done(null,user);
            }
            else{
                done(null,false);
            }
        }
    }
    catch(err)
    {
        done(err);
    }
}
const strategy=new LocalStrategy(validation);
passport.use(strategy);
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((userid,done)=>{
    User.findById(userid)
    .then(user=>{
        done(null,user);
    })
    .catch((err)=>{
        done(err);
    })
})