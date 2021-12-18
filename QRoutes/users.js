const express=require('express')
const router=express.Router()
const User=require('../user_schema/schema.js')

router.get('/',async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(err){
        res.send("Error "+err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.json(user)
    }catch(err){
        res.send("Error "+err)
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        user.img_link=req.body.img_link
        const a1= await user.save()
        res.json(a1)
    }catch(err){
        res.send("Error "+err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const a1= await user.remove()
        res.send('Removed')
    }catch(err){
        res.send("Error "+err)
    }
})

router.post('/',async(req,res)=>{
    const user= new Question({
        name:req.body.name,
        points:req.body.points,
        rank:req.body.rank
    })
    try{
        const a1= await user.save()
        res.send(a1)
    }catch(err){
        console.log("Error "+err)
    }
})

module.exports=router