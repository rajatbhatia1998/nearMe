var mongoose = require('mongoose')

var roomModel =  new mongoose.Schema({

    roomName:{type:String,default:"Family"},
    password:{type:String,default:""},
    users:[
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})


module.exports = mongoose.model('Room',roomModel)