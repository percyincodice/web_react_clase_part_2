import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand" style={{cursor: 'pointer'}} onClick={() => navigate('/person')}>Mi App</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          <div className="d-flex">
            <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar Sesion</button>
          </div>
        </div>
      </div>
    </nav>)
}

export default NavBar;