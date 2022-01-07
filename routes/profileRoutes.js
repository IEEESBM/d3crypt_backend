const express=require('express');

const User=require("./users")



const router=express.Router();

router.get('/Allusers',checkAuth,async(req,res,next)=>{
    User.find({},(error,data)=>{

        if(!error)
        {
        try{
            res.send(data);
        }
        catch(err)
        {
            res.send("error sending data")
        }
    }
    else{
        res.send("error fetching users")
    }
    });








//get single user
router.get("/User/:id", async (request, res) => {
    const UserId = Number(request.params.id);
    try
    {
        const getuser = await User.find({Id:UserId});

    }
    catch(err)
    {
        res.statis(500).send("error fetching data from database")
    }
    if (!getuser) {
    return res.status (500) .send ("Account not found.");
     }
      else {
    return res.status(200). json(getuser);

      }
});








//edit user
router.put("/edit/:userId", checkAuth, async(req, res, next) =>{

    const id = req.params.userId;
    try{
   await User.findOneAndUpdate({ _id: id }, { $set: req.body });
   res.status(200).send("updated successfully")
    }
    catch(err){
        res.status(500).send("couldnt update")
    }

});