var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    coords:{
        lat:{type:Number,default:0},
        lng:{type:Number,default:0}
    },
    room:{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
})


module.exports = mongoose.model('User',userSchema)