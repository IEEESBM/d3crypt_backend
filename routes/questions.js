const express=require('express')
const router=express.Router()
const Question=require('../Questions_Schema/question_schema.js')

router.get('/',async(req,res)=>{
    try{
        const questions=await Question.find()
        res.json(questions)
    }catch(err){
        res.send("Error "+err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        res.json(question)
    }catch(err){
        res.send("Error "+err)
    }
})

router.patch('/:index',async(req,res)=>{
    try{
        const q=await Question.findById(req.params.id)
        const data=req.body
        q.image_1=data.image_1
        q.image_2=data.image_2
        q.image_3=data.image_3
        q.image_4=data.image_4
        q.index=data.index
        q.question=data.question
        q.difficulty=data.question
        q.points=data.points
        q.answer=data.answer
        const a1= await q.save()
        res.json(a1)
    }catch(err){
        res.send("Error "+err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        const a1= await question.remove()
        res.send('Removed')
    }catch(err){
        res.send("Error "+err)
    }
})

router.post('/',async(req,res)=>{
    const question= new Question({
        answer:req.body.answer,
        image_1:req.body.image_1,
        image_2:req.body.image_2,
        image_3:req.body.image_3,
        image_4:req.body.image_4,
        difficulty:req.body.difficulty,
        points:req.body.points,
        question:req.body.question,
        index:req.body.index
    })
    try{
        const a1= await question.save()
        res.send(a1)
    }catch(err){
        console.log("Error "+err)
    }
})

module.exports=router