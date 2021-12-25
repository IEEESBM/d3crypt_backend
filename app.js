const express=require('express')
const mongoose=require('mongoose')
const url='mongodb://localhost/Decrypt'

const app=express()

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on('open',()=>{
    console.log('Connected...')
})

app.use(express.json())

const questionRouter=require('./QRoutes/questions')
app.use('/questions',questionRouter)

const userRouter=require('./QRoutes/users')
app.use('/users',userRouter)

app.listen(9000, ()=>{
    console.log("Server started")
})
