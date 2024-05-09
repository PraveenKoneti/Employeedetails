import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
import axios from 'axios';



const Employeedetails = () =>
{

    let[name, pickname] = useState("");
    let[email, pickemail] = useState("");
    let[mobile, pickmobile] = useState("");
    let[designation, pickdesignation] = useState("");
    let[gender, pickgender] = useState("");
    let[course, pickcourse] = useState("");
    let[image, pickimage] = useState(null);
    let[button, pickbutton] = useState("Save");
    let[searchkey, picksearchkey] = useState("");
    let[employeeid, pickemployeeid] = useState("");
    let[photo, pickphoto]=useState("");

    let[emailerror, pickemailerror] = useState("");


    

    const save = (e) =>{
        let c = 0;

        let nameValidationPattern = "^[a-zA-Z\\s]+$";
        let namevalidation = new RegExp(nameValidationPattern);
        if(!namevalidation.test(name))
            c = 1;

        let epatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(epatern.test(email))
        {
            let url = "http://localhost:8888/employee/searchemail";
            let postData = {
                headers : {'Content-Type' : 'application/json'},
                method : "post",
                body   : JSON.stringify( {search:email} )
            }
            fetch(url, postData)
            .then(res=>res.json())
            .then(res=>{
                if(res.message == true)
                {
                    c = 1;
                    pickemailerror("This Email is already existed");
                }
                else
                    pickemailerror("");
            })
        }

        let mpattern = /^[6789]\d{9}$/;
        if(!mpattern.test(mobile))
            c = 1;

        if(designation == "")
            c = 1;

        if(gender == "")
            c = 1;

        if(course == "")
            c = 1;

        if(image === null)
            c = 1;

        if(c === 0)
        {
            if(employeeid == "")
            {
                const currentDate = new Date();
                const date = currentDate
                    .toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).split('/').join('-');

                e.preventDefault(); // Prevent default form submission behavior
                
                // Create a new FormData instance and append form data
                const formData = new FormData();
                formData.append('name', name);
                formData.append('mobile', mobile);
                formData.append('email', email);
                formData.append('designation', designation);
                formData.append('gender', gender);
                formData.append('course', course);
                formData.append('date', date);
                pickimage(image===null?photo:image)
                formData.append('employeeimage', image); // Append the actual file object
            
                // Make POST request using axios
                axios.post("http://localhost:8888/employee/saveemployee", formData)
                    .then(res => {
                        toast.success("Employee Data Added Successfully");
                        window.location.reload();
                        getlist();  
                    })
                    .catch(err => {
                        console.error("Error saving record:", err);
                        toast.error("Error saving record", err.message, "error");
                    });
            }
            else
            {
                const currentDate = new Date();
                const date = currentDate
                    .toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).split('/').join('-');

                e.preventDefault(); // Prevent default form submission behavior
                
                // Create a new FormData instance and append form data
                const formData = new FormData();
                formData.append('id', employeeid);
                formData.append('name', name);
                formData.append('mobile', mobile);
                formData.append('email', email);
                formData.append('designation', designation);
                formData.append('gender', gender);
                formData.append('course', course);
                formData.append('date', date);
                formData.append('employeeimage', image); // Append the actual file object
            
                // Make POST request using axios
                axios.post("http://localhost:8888/employee/updateemployeedetails", formData)
                    .then(res => {
                        toast.success("Employee Data Added Successfully");
                        getlist();  
                    })
                    .catch(err => {
                        console.error("Error saving record:", err);
                        toast.error("Error saving record", err.message, "error");
                    });
            }

        }
        else
            toast.error("Please Enter the Fields Correctly");
    }

    const handleFileChange = (e) => {
        // Update state with the selected file object
        const file = e.target.files[0];
        console.log(file);
        pickimage(file);
        alert(file);
    };



    const updatemployee = (id) =>
    {
        let url = "http://localhost:8888/employee/getemployeedetails";
        let postData = {
            headers : {'Content-Type' : 'application/json'},
            method  : "post",
            body    : JSON.stringify( {id : id})
        }
        fetch(url, postData)
        .then(res=>res.json())
        .then(res=>{
           pickname( res.name);
           pickemail(res.email);
           pickmobile(res.mobile);
           pickdesignation(res.designation);
           pickcourse(res.course);
           pickgender(res.gender);
           pickbutton("Update");
           pickemployeeid(res._id);
        })
    }


    const deleteemployee = (id) =>
    {
        let url = "http://localhost:8888/employee/deleteemployee";
        let postData = {
            headers : {'Content-Type' : 'application/json'},
            method  : "post",
            body    : JSON.stringify( {id : id})
        }
        fetch(url, postData)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            toast.success(res.message);
            getlist();
        })
    }




    let[employeelist, pickemployeelist] = useState( [] );
    const getlist = () =>
    {
        fetch("http://localhost:8888/employee/getemployeelist")
        .then(res=>res.json())
        .then(res=>{
            res.sort((a, b) => a.name.localeCompare(b.name));
            pickemployeelist(res);
        })
    }

    useEffect(()=>{getlist();}, []);

    if(localStorage.getItem("username")===null)
        return <Navigate to="/adminlogin" />

    return(
        <div className="container">
            <div className="row mt-4 mb-4">
                <h1 className="text-decoration-underline"> Employee List </h1>
                <h4 className="text-end col-12"> Total Count : {employeelist.length}  <button className="btn btn-success ms-5" data-bs-toggle="modal" data-bs-target="#myModal"> Create Employee </button> </h4>
                <h5 className="text-end col-sm-5 ms-auto mt-3">
                    <div class="input-group">
                        <i class="fa fa-search bg-warning input-group-text"></i>
                        <input type="text" class="form-control shadow-none" placeholder="Enter Search Keyword ..." onChange={obj=>picksearchkey(obj.target.value)} value={searchkey} />
                    </div>    
                </h5>
                <div className="col-sm-12 m-auto mt-4">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Image </th>
                                    <th> Name </th>
                                    <th> Email </th>
                                    <th> Mobile No </th>
                                    <th> Designation </th>
                                    <th> Gender </th>
                                    <th> Course </th>
                                    <th> Date </th>
                                    <th> Action </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    employeelist.map((employee, index)=>{
                                        if(employee.name.toLowerCase().match(searchkey.toLowerCase()) || employee.email.toLowerCase().match(searchkey.toLowerCase()) || employee.mobile.toString().match(searchkey) || employee.gender.toLowerCase().match(searchkey.toLowerCase()))
                                        return(
                                            <tr key={index}>
                                                <td> {employee._id} </td>
                                                <td>  <img src={`http://127.0.0.1:5500/employeedatabase/employeeimages/${employee.image}`} width="60" height="60" /></td>
                                                <td> {employee.name} </td>
                                                <td> {employee.email} </td>
                                                <td> {employee.mobile} </td>
                                                <td> {employee.designation} </td>
                                                <td> {employee.gender} </td>
                                                <td> {employee.course} </td>
                                                <td> {employee.date} </td>
                                                <td> 
                                                    <div className="row">
                                                        <div className="col-6"> <i onClick={updatemployee.bind(this, employee._id)} data-bs-toggle="modal" data-bs-target="#myModal" className="fa fa-edit text-primary ms-auto"></i> </div>
                                                        <div className="col-6"> <i onClick={deleteemployee.bind(this, employee._id)} className="fa fa-trash text-danger ms-auto"> </i> </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>

                <div class="modal" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">

                        <div class="modal-header">
                            <h3 class="modal-title text-center text-primary"> <i className="fa fa-user-plus"></i> Add Employee </h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <form onSubmit={save} encType='multipart/form-data'>
                                <div className="card border-0 p-2">
                                    <div className="card-body">
                                        <div className="row mb-4">
                                            <h6> Name </h6>
                                            <input type="text" className="form-control" onChange={obj=>pickname(obj.target.value)} value={name} />
                                        </div>
                                        <div className="row mb-4">
                                            <h6> E-mail Id </h6>
                                            <input type="email" className="form-control" onChange={obj=>pickemail(obj.target.value)} value={email} />
                                            <i className="text-danger"> {emailerror} </i>
                                        </div>
                                        <div className="row mb-4">
                                            <h6> Mobile No </h6>
                                            <input type="number" className="form-control" onChange={obj=>pickmobile(obj.target.value)} value={mobile} />
                                        </div>
                                        <div className="row mb-4">
                                            <h6> Designation </h6>
                                            <select type="text" className="form-select" onChange={obj=>pickdesignation(obj.target.value)} value={designation} > 
                                                <option> Choose Designation </option>
                                                <option> HR </option>
                                                <option> Manager </option>
                                                <option> Sales </option>
                                            </select>
                                        </div>
                                        <div className="row mb-4">
                                            <h6> Gender </h6>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <div class="form-check">
                                                        <input type="radio" class="form-check-input" onChange={obj=>pickgender(obj.target.value)} value="male" name="gender" checked={gender==="male"} />
                                                            Male 
                                                    </div>
                                                </div>
                                                        
                                                <div className="col-sm-6">
                                                    <div class="form-check">
                                                        <input type="radio" class="form-check-input" onChange={obj=>pickgender(obj.target.value)} value="female" name="gender" checked={gender==="female"}   /> 
                                                        Female 
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <h6> Course </h6>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="employeecourse" onChange={obj=>pickcourse(obj.target.value)} value="MCA" checked={course==="MCA"} /> 
                                                        MCA 
                                                    </div>
                                                </div> 
                                                <div className="col-sm-4"> 
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="employeecourse" onChange={obj=>pickcourse(obj.target.value)} value="BCA" checked={course==="BCA"} /> 
                                                        BCA 
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="employeecourse" onChange={obj=>pickcourse(obj.target.value)} value="BSC" checked={course==="BSC"} /> 
                                                        BSC 
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <h6> Image upload </h6>
                                            <input type="file" accept=".png, .jpg, .jpeg" className="form-control" onChange={handleFileChange}  />
                                            {
                                                (image === null) ? (<i className="text-danger"> Upload the image  </i>):''
                                            }
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-primary form-control" data-bs-dismiss="modal"> {button} </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employeedetails;    