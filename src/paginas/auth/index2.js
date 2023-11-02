import React from 'react';
import { Link } from 'react-router-dom';

const index2 = () => {
  return (
    <div className="wrapper">
      {/* Preloader */}
      <div className="preloader flex-column justify-content-center align-items-center">
        <img className="animation__wobble" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
      </div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-dark">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars" /></Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="index3.html" className="nav-link">Home</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" className="nav-link">Contact</Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <Link className="nav-link" data-widget="navbar-search" to="#" role="button">
              <i className="fas fa-search" />
            </Link>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default index2;
