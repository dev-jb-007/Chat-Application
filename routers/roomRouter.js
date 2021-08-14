const passport=require('passport');
const express=require('express');
const router=express.Router();
const Room=require('../models/rooms');
router.use(passport.initialize());
router.use(passport.session());

router.route('/create')
    .post(async (req,res,next)=>{
        try{
            let room=new Room({...req.body,admin:req.user._id});
            room.users.push(req.user._id);
            await room.save();
            res.render('chat');
        }
        catch(err)
        {
            next(err);
        }
    })

module.exports=router;