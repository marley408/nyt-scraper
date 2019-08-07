import React from 'react';
import '../App.css';

const Landing = () => {
  return (
    <div className="landing-page-container">
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Log In </h3>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value=""
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value=""
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Log In" />
              </div>
              {/* <div className="form-group">
              <a href="#" className="ForgetPwd">
                Forget Password?
              </a>
            </div> */}
            </form>
          </div>
          <div className="col-md-6 login-form-2">
            <h3>Create Account</h3>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value=""
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value=""
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value=""
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value=""
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Register" />
              </div>
              {/* <div className="form-group">
              <a href="#" className="ForgetPwd" value="Login">
                Forget Password?
              </a>
            </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
