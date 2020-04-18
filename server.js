const express = require('express')
const app  = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uri = require('./config/mongoUri')


//Setting Up the bodyparser and mongoose
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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
    
   

}
app.use(express.static('client/build'))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port  = 4000
app.listen(port,()=>{
    console.log(`Running at Port ${port}`)
})