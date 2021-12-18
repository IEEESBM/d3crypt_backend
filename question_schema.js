const mongoose=require('mongoose')

const QuestionSchema=new mongoose.Schema({
    answers:{
        type:String,
        required:true
    },
    difficulty:{
        type:Number,
        required:true
    },
    points:{
        required:true,
        type:Number
    },
    img_links:{
        required:true,
        type:String
    },
    question:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Question',QuestionSchema)