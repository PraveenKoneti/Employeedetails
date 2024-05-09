
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Adminlogin = () =>
{

    let[username, pickusername] = useState("");
    let[userpassword, pickuserpassword] = useState("");

    const login = () =>
    {
        let url = "http://localhost:8888/admin/adminlogin";
        let userdetails = {username : username, password : userpassword}; 
        let postdata = {
            headers : {'Content-Type' : 'application/json'},
            method : "post",
            body   : JSON.stringify(userdetails)
        }
        fetch(url, postdata)
        .then(res=>res.json())
        .then(userlogin=>{
            if(userlogin.length > 0)
            {
                localStorage.setItem("username", userlogin[0].username);
                toast.success("Login Sucessfull");
                window.location.reload();
            }
            else
                toast.warning("Username & Password are not Matched");
        })
    }

    if(localStorage.getItem("username") !== null)
            return <Navigate to='/dashboard' />


    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-4 m-auto">
                    <div className="card border-0 shadow-lg">
                            <div className="card-body">
                                 <h3 className="text-center mb-4 mt-3 text-primary"> <i className="fa fa-user me-1"></i> Admin Login </h3>
                                <div className="input-group mb-3">
                                    <span className="input-group-text justify-content-center col-xl-2 border-top-0 border-end-0 border-start-0 border-bottom-2 border-black rounded-0">  <i className="fa fa-user"></i>  </span>
                                    <input type="text" className="form-control border-top-0 border-end-0 border-start-0 border-bottom-2 border-black rounded-0 shadow-none" placeholder="Enter Username" onChange={obj=>pickusername(obj.target.value)} value={username} />
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text justify-content-center col-xl-2 border-top-0 border-end-0 border-start-0 border-bottom-2 border-black rounded-0">  <i className="fa fa-key"></i>  </span>
                                    <input type="password" className="form-control border-top-0 border-end-0 border-start-0 border-bottom-2 border-black rounded-0 shadow-none" placeholder="Enter Password" onChange={obj=>pickuserpassword(obj.target.value)} value={userpassword} />
                                </div>
                            </div>

                            <div className="card-footer text-center bg-white border-0 mt-0">
                                <div className="row text-center mb-3 mt-0"> 
                                    <div className="col-6 text-center text-start m-auto">  <button className="btn btn-primary text-center ms-3 mt-1 mb-1" onClick={login}> Login  <i className="fa fa-arrow-right"></i> </button> </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminlogin;