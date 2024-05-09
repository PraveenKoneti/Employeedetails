const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


let Employee = require('./employeeschema');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'employeeimages');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg' , 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/saveemployee').post(upload.single('employeeimage'), async(req, res) => {

    const name           =  req.body.name;
    const mobile         =  req.body.mobile;
    const email          =  req.body.email;
    const designation    =  req.body.designation;
    const gender         =  req.body.gender;
    const course         =  req.body.course;
    const date           =  req.body.date;
    const image          =  req.file.filename;

    const newemployee = {
       name,
       mobile,
       email,
       designation,
       gender,
       course,
       date,
       image
    }
    const newdata = new Employee(newemployee);             //   http://localhost:8888/employee/saveemployee
    await newdata.save()
           .then(() => res.json('employee Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});



            // TO SEARCH THE EMAIL ARE EXIST OR NOT IN DATABASE

router.post('/searchemail', async(req, res)=>{
    let searchvalue = req.body.search;
    let email = await Employee.find( {email : searchvalue} );
    if(email.length > 0)                                           // http://localhost:8888/employee/searchemail
        res.status(200).json( {"message" : true});
    else
        res.status(200).json( {"message" : false});
                                                                          
});



            // TO GET THE ALL EMPLOYEE LIST FROM MONGODB

router.get("/getemployeelist", async(req, res)=>{
    let employeelist = await Employee.find();
    res.status(200).json( employeelist );                   //   http://localhost;8888/employee/getemployeelist
});



        // TO GET THE EMPLOYEE DETAILS 

router.post("/getemployeedetails", async(req, res)=>{
    let id= req.body.id;
    let employee = await Employee.findById(id);
    res.status(200).json(employee);                      // http://localhost:8888/employee/getemployeedetails
})


        //  TO UPDATE THE EMPLOYEE DETAILS  

router.route("/updateemployeedetails").post(upload.single('employeeimage'), async(req, res) => {
    let id = req.body.id;
    let employeeinfo = await Employee.findById(id);
    console.log(employeeinfo);
        employeeinfo.name        = req.body.name;
        employeeinfo.email       = req.body.email;
        employeeinfo.mobile      = req.body.mobile;
        employeeinfo.designation = req.body.designation;
        employeeinfo.gender      = req.body.gender;
        employeeinfo.course      = req.body.course;
        employeeinfo.date        = req.body.date;
        employeeinfo.image       = req.file.filename;

       await employeeinfo.save();
        res.status(200).json( {"message" : "Employee Updated Successfully"} );

})


router.post("/deleteemployee", async(req, res)=>{
    let id = req.body.id;
    let employee =  await Employee.findById(id);          // http://localhost:8888/employee/deleteemployee
    await employee.deleteOne();
    res.status(200).json( {"message" : "Employee Deleted Successfully"});
})



module.exports = router;