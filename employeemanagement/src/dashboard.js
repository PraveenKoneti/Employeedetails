import { Navigate } from "react-router-dom";



const Dashboard = () =>
{
    if(localStorage.getItem("username")===null)
            return <Navigate to="/adminlogin" />
    return(
        <div className="container">
            <div className="row mt-5">
                <h1 className="text-center"> Welcome {localStorage.getItem("username")} </h1>
            </div>
        </div>
    )
}

export default Dashboard;