
const express = require("express");   //   calling express framework
const app = express();                //   creating object of express
const cors = require("cors");         //   calling cors origin library to allow data communication between 2 servers
app.use(cors());                      //   creating object of cors library
app.use(express.json());              //   enable json data communication





const mongoose = require("mongoose"); 
mongoose.connect("mongodb://127.0.0.1:27017/empowerhub")
const db = mongoose.connection;






db.on("error", (error)=>console.log("Error in database connection"));
db.on("open", ()=>console.log("Database is Connected..."));



let Admin = require("./adminapi");
app.use("/admin", Admin);                     // http://localhost:8888/admin


let Employee = require("./employeeapi");
app.use("/employee", Employee);            // http://localhost:8888/employee



app.listen(8888, function(){
    console.log("The Server is live...");
})