import React from 'react';
import logo from '../static/images/logo.svg';


export const NavBar = () => {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-light" >
             <div className="container">

                <a className="navbar-brand logo-image" href="#"><img src={logo} alt="alternative"/></a> 

                <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse offcanvas-collapse d-flex justify-content-end" id="navbarsExampleDefault">
                    <span className="nav-item">
                        <a className="btn-solid-sm page-scroll " href="#header">connect with metmask</a>
                    </span>
                </div> {/* -- end of container --> */}
            
            </div> {/* -- end of navbar --> */}
        </div>
    )
}

export default NavBar;