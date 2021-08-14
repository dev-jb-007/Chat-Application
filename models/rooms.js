const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})
module.exports=mongoose.model('room',roomSchema);