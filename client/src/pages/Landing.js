import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import '../App.css';
import { Redirect } from 'react-router';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const { setId } = useContext(UserContext);

  const clearLogInForm = () => {
    setEmail('');
    setPassword('');
  };

  const logInBtn = e => {
    if (email === '' && password === '') {
      return;
    } else {
      fetch('/api/user/login', {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          clearLogInForm();
          if (data.token) {
            localStorage.setItem('token', data.token);
            setSuccessfulLogin(true);
            setId(data.userId);
          }
        })
        .catch(err => {
          alert('email or password is invalid');
        });
    }
  };

  if (successfulLogin) {
    return <Redirect to="/home" />;
  }

  const clearRegisterForm = () => {
    setName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setConfirmPassword('');
  };

  // if passwords do not match, alert user and do not submit form
  const registerBtn = e => {
    if (confirmPassword !== registerPassword) {
      alert('passwords dont match');
    } else {
      fetch('/api/user/register', {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          name: name,
          email: registerEmail,
          password: registerPassword
        })
      })
        .then(res => res.json())
        .then(data => {
          clearRegisterForm();
          if (data.token) {
            localStorage.setItem('token', data.token);
            setSuccessfulLogin(true);
            setId(data.userId);
          }
        });
    }
  };

  if (successfulLogin) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="landing-page-container">
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Log In </h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                logInBtn();
              }}
            >
              <div className="form-group">
                <input
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Log In" />
              </div>
            </form>
          </div>
          <div className="col-md-6 login-form-2">
            <h3>Create Account</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerBtn();
              }}
            >
              <div className="form-group">
                <input
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    setRegisterEmail(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    setRegisterPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
