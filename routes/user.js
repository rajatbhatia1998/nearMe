var express = require('express')
var router = express.Router()
var User =  require('../model/UserModel')


//Route@ api/user/:id
//Get user details with there id
//Type GET
router.get("/:id",(req,res)=>{
    var id = req.params.id
    if(id!==""){
        User.findOne({},{username:1,coords:1,room:1},(err,user)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.send(user)
            }
        })
    }

})

//Route@ api/user/login
//Login with user credentials
//Type POST
router.post("/login",(req,res)=>{
    var username = req.body.username
    var password = req.body.password

    if(username!=="" && password!==""){

        User.findOne({username,password},{username:1,coords:1,room:1})
        .then(user=>{
            if(user){
                return res.send(user)
            }else{
                return res.status(200).json({error:"INVALID CREDENTIALS"})
            }
        }).catch(err=>res.status(400).send(err))

    }else{
        return res.status(400).json({error:"Please Enter values"})
    }
})

//Route@ api/user/signup
//Signup for new user
//Type POST
router.post("/signup",(req,res)=>{

    var username = req.body.username
    var password = req.body.password

    if(username!=="" && password!==""){

        User.findOne({username}).then(user=>{
            if(user){
                return res.status(200).send({error:"Username already Taken"})
            }
            else{
                User.create({
                    username,
                    password
                })
                .then(user=>res.send(user))
                .catch(err=>res.send(err))
            }
        })
    }else{
       return res.status(400).json({error:"Please Enter values"})
    }
})

//Route@ api/user/coords/:id
//Set user current coords
//Type POST
router.post('/coords/:id',(req,res)=>{
    var id = req.params.id
    if(id!==""){
                User.findOneAndUpdate({"_id":id},{$set:{coords:{
                    lat:req.body.lat,
                    lng:req.body.lng
                }}}, {upsert: true},(err,doc)=>{
                    if(err){
                        return res.status(400).send(err)
                    }
                    else{
                      
                        res.send({message:"Coordinates updated successfully"})
                    }
                })
            }
})

//Route@ api/user/coords/:id
//Get user current coords
//Type GET
router.get('/coords/:id',(req,res)=>{
    var id = req.params.id
    console.log(id)
    if(id!==""){
        User.findOne({"_id":id},{"coords":1,"_id":0},(err,doc)=>{
                if(err){
                   return res.status(500).send(err)
                }
                    return res.send(doc)
                    
                
        })
    }else{
        return res.status(500).send({error:"No id found"})
    }
})

router.get('/:id',(req,res)=>{
    var id = req.params.id
    console.log(id)
    if(id!==""){
        User.findOne({"_id":id},{"coords":0,"_id":0},(err,doc)=>{
                if(err){
                   return res.status(200).send(err)
                }
                    return res.send(doc)
                    
                
        })
    }else{
        return res.status(200).send({error:"No id found"})
    }
})
module.exports = router;