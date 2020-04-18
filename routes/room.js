var express = require('express')
var router = express.Router()
var Room =  require('../model/RoomModel')
var User = require('../model/UserModel')


//Route@ api/room/createRoom
//Create new room
//Type POST
router.post('/createRoom',(req,res)=>{
    var password = req.body.password
    var roomName = req.body.roomName
    if(password!==""){
        Room.findOne({roomName},(err,room)=>{
            console.log(room,roomName)
            if(room!==null){
                return res.send({error:"Room Name Taken"})
            }else{
                Room.create({
                    password:password,
                    roomName:roomName
                })
                .then(room=>res.send(room))
                .catch(err=>res.send(err))
            }
        })
        
    }else{
        return res.send({error:"Password must be there"})
    }
})


//Route@ api/room/joinRoom
//Join Room by userId and roomId
//Type POST
router.post('/joinRoom/:id/:roomId',(req,res)=>{
    var id = req.params.id
    var password = req.body.password
    var roomId = req.params.roomId
    if( password!==""){

        Room.findOne({_id:roomId,password:password},(err,room)=>{
            if(err){
                return res.send({error:"Invalid Room"})
            }
            
            if(room){
                User.findOne({_id:id},(err,user)=>{
                    if(err){
                       return res.send(err)
                    }
                    var isInArray = room.users.some(function (member) {
                        return member.equals(id);
                    });

                    if(isInArray){
                            return res.send({error:"Room already Joined"})
                    }else{
                        room.users.push(user)
                        room.save().then(
                        ()=>{
                            if(user.room){
                                return res.send({error:"Cannot Join Multiple Room"})
                            }else{
                                user.room = room
                                user.save()
                                res.send({message:"Room joined Success"})
                            }
                            
                        }
                    )
                    }
                   
                    
                })
                
               
            }else{
                return res.status(200).send({error:"Invalid Room Pass"})
            }
        })
       
    }else{
        return res.status(500).send({error:"Password incorrect"})
    }
})


//Route@ api/room/
//Get All room details
//Type GET
router.get('/',(req,res)=>{
    Room.find({},{password:0,users:0})
    .exec((err,rooms)=>{
        if(err){
            res.status(500).json(err)
        }else{
            return res.send(rooms)
        }
    })
})


//Route@ api/room/:id
//Get Room details by roomID
//Type GET
router.get('/:id',(req,res)=>{
   
    Room.find({_id:req.params.id},{password:0})
    .populate('users',['username','coords'])
    .exec((err,rooms)=>{
        if(err){
            res.status(500).json(err)
        }else{
            return res.send(rooms)
        }
    })
})


module.exports = router