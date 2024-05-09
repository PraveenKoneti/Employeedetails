
import {HashRouter, Routes, Route, Link} from 'react-router-dom';
import Adminlogin from './userlogin';
import Dashboard from './dashboard';
import Employeedetails from './employeedetails';

const Employeeapp = () =>
{
    const logout = () =>
    {
        localStorage.removeItem("username");
        window.location.reload();    
    }

    const checkadminlogin = () =>
    {
        if(localStorage.getItem("username") !== null)
            return(
                <>
                    <li class="nav-item me-3">
                        <Link to="/dashboard" className='nav-link text-white'> <h5> <i className='fa fa-home'></i>  Home  </h5> </Link>
                    </li>
                    <li class="nav-item me-3">
                        <Link to="/employeelist"  className='nav-link text-white'> <h5> <i className='fa fa-list'></i> Employee Details </h5> </Link>
                    </li>
                    <li class="nav-item me-3">
                        <Link onClick={logout} className='nav-link text-white'> <h5 className='text-danger'> <b className='text-primary me-1'> <i className='fa fa-user'></i> {localStorage.getItem("username")} </b> <b className='text-white'> - </b> <i className='fa fa-power-off ms-1'></i> Logout </h5></Link>
                    </li>
                </>
        )
    }

    return(
        <HashRouter>
            <nav class="navbar navbar-expand-sm navbar-dark bg-black p-3 sticky-top">
                <div class="container d-flex justify-content-between align-items-center">
                    <h3 class='text-white d-flex align-items-center m-0 custom-logo'> 
                        <img src="empowerhub.jpg" className='me-2' width="60" height="60" alt="Empower Hub logo" /> Empower Hub
                    </h3>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mynavbar">
                        <ul class="navbar-nav ms-auto">
                            {checkadminlogin()}
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path='/' element={ <Adminlogin/> } />
                <Route exact path='/adminlogin' element={ <Adminlogin/> } />
                <Route exact path='/dashboard' element={ <Dashboard/> } />
                <Route exact path="/employeelist" element={ <Employeedetails/> } />
            </Routes>
        </HashRouter>
    )
}

export default Employeeapp;