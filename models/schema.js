const mongoose=require('mongoose')

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    rank:{
        required:true,
        type:Number
    }
})

module.exports=mongoose.model('first_years',user)