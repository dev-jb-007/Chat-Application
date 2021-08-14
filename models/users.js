const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rooms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'room'
        }
    ]
})
userSchema.methods.isPasswordValid = async function (password) {
    if (this.password == password) {
        return true;
    }
    else {
        return false;
    }
}
module.exports=mongoose.model('user',userSchema);