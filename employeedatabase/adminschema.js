//schema--Structure of  a table.
const mongoose=require("mongoose");

const tableStructure = new mongoose.Schema({
    username : { type:String, required:true },
    email    : { type:String, required:true },
    password  : { type:String, required:true}
});
 
module.exports = mongoose.model("Admin", tableStructure);