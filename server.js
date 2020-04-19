const express = require('express')
const app  = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uri = require('./config/mongoUri')
var path = require('path');

//Setting Up the bodyparser and mongoose
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(uri,{ useNewUrlParser: true ,useUnifiedTopology: true},(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Connected to mongoDb")
    }
})

//Api Routes
const user = require('./routes/user')
const room = require('./routes/room')


app.use('/api/user',user)
app.use('/api/room',room)


if(process.env.NODE_ENV==='production'){
    app.use('/',express.static("/cl/build"));
    console.log(__dirname+'/cl/build')
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "cl", "build", "index.html"));
    });

}




const port  = 5000
app.listen(port,()=>{
    console.log(`Running at Port ${port}`)
})