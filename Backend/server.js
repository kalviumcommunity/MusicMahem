require('dotenv').config();
const express = require('express')
const cors=require("cors")
const app = express()
const bodyParser=require("body-parser")
const {getRouter, postRouter, deleteRouter, putRouter} = require("./routes/Music.routes");
const {connectdb, isConnectedNow} = require('./config/dbConn')
const { signup, login } = require("./routes/AuthServer");
app.use(cors())
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
})

app.use(express.json())
app.use("/",signup)
app.use("/",login)
app.use(bodyParser.json())
app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",deleteRouter)
app.use("/",putRouter)

app.get("/ping",(req,res)=>{
    res.send("Hi! This is Jeeveeka")
})

app.get("/main",(req,res)=>{
    res.json({
        message: isConnectedNow()? "Database is connected" : "Database is disconnected"
    })
})

app.listen(3000, async() => {
    await connectdb();
    console.log("Server is running on port 3000");
});

