const express=require("express");
const router=express.Router();
module.exports =router;

const Admin = require("./adminschema");


router.post("/adminlogin", async(req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let admin = await Admin.find( {username : username, password:password});   // http://localhost:8888/admin/adminlogin
    res.status(200).json(admin);
})