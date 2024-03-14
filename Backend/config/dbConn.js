const mongoose=require("mongoose")
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Connected to MongoDB");

    }catch(err){
        console.log("error", err)
    }
}

const isConnectedNow = () =>{
    return (mongoose.connection.readyState === 1);
}
module.exports={connectdb,isConnectedNow};