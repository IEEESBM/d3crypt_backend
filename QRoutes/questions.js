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

router.patch('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        question.img_link=req.body.img_link
        const a1= await question.save()
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
        answers:req.body.answers,
        img_links:req.body.img_links,
        difficulty:req.body.difficulty,
        points:req.body.points,
        question:req.body.question
    })
    try{
        const a1= await question.save()
        res.send(a1)
    }catch(err){
        console.log("Error "+err)
    }
})

module.exports=router