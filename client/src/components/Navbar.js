import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { UserContext } from './UserContext';

const Navbar = () => {
  const context = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  static-top">
        <div className="container">
          <div className="navbar-brand" href="#">
            <h1 className="logo">Sideline</h1>
          </div>
          {context.id && (
            <>
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
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/home">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/saved">
                      Saved Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      onClick={() => {
                        localStorage.removeItem('token');
                        context.setId(null);
                      }}
                      className="nav-link"
                      to="/"
                    >
                      Sign out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
