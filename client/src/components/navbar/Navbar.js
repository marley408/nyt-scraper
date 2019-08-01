import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">Sideline</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Sign In</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
