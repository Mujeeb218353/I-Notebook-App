import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar  ()  {
    let location = useLocation();
    let navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <nav className={'navbar navbar-expand-lg bg-dark navbar-dark'}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {
                            !localStorage.getItem('token') ?
                                <div className={'d-flex p-1 justify-content-around'}>
                                    <Link className={`btn btn-primary mx-2 ${location.pathname === "/login" ? "d-none" : ""}`} to="/login" role="button">LogIn</Link>
                                    <Link className={`btn btn-primary mx-2 ${location.pathname === "/signup" ? "d-none" : ""}`} to="/signup" role="button">SignUp</Link>
                                </div>
                                :
                                <div className={'d-flex p-1 justify-content-around'}>
                                    <button className={'btn btn-primary mx-3'} onClick={logout}>Log Out</button>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;