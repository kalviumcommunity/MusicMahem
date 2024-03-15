const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetails=new Schema({
    Name:{type:String,required:true,unique : true},
    Password:{type:String,required:true},
},{
    timestamps: true  
  });

const Model = mongoose.model("users",userDetails)

module.exports=Model