const express = require('express')
const app = express()

app.get("/ping",(req,res)=>{
    res.send("Hi! This is Jeeveeka")
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});