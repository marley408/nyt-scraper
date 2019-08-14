import React from 'react';
import '../App.css';

const NotFound = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  static-top">
        <div className="container">
          <div className="navbar-brand" href="#">
            <h1 className="logo">Sideline</h1>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">404</h1>
          <h1 className="display-4">Page Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
