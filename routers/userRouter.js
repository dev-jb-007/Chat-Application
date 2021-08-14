const express=require('express');
const router=express.Router();
const User=require('../models/users');
const passport=require('passport');
require('../config/passport');
router.use(passport.initialize());
router.use(passport.session());
router.route('/login')
    .post(passport.authenticate('local'),async (req,res,next)=>{
        try{
            res.redirect('../../chat');
        }
        catch(err)
        {
            next(err);
        }
    });
router.route('/signup')
    .post(async (req,res,next)=>{
        try{
            const user=await User.create(req.body);
            res.render('home');
        }
        catch(err)
        {
            next(err);
        }
    });

module.exports=router;