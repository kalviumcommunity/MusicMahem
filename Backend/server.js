require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser=require("body-parser")
const {connectdb, isConnectedNow} = require('./config/dbConn')
app.use(bodyParser.json())
app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",deleteRouter)
app.use("/",putRouter)


app.get("/ping",(req,res)=>{
    res.send("Hi! This is Jeeveeka")
})

app.get("/home",(req,res)=>{
    res.json({
        message: isConnectedNow()? "Database is connected" : "Database is disconnected"
    })
})

app.listen(3000, async() => {
    await connectdb();
    console.log("Server is running on port 3000");
});

