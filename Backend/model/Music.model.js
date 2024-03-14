const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const details=new Schema({
    ID:{type:Number},
    Singer:{type:String},
    Song:{type:String},
    Language:{type:String},
    Created_By:{type:String}
},{
    timestamps: true  
  });

const Model = mongoose.model("music",details)

module.exports=Model