//schema--Structure of  a table.
const mongoose=require("mongoose");

const tableStructure = new mongoose.Schema({
    name            : { type:String, required:true},
    mobile          : { type:Number, required:true},
    email           : { type:String, required:true},
    designation     : { type:String, required:true},
    gender          : { type:String, required:true},
    course          : { type:String, required:true},
    date            : { type:String, required:true},
    image           : { type:String, required:true, trim: true}
});
 
module.exports = mongoose.model("Employee", tableStructure);