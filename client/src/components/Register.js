import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Redirect } from 'react-router-dom';
import '../App.css';

const Register = props => {
  const { toggleForm } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const { setId } = useContext(UserContext);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // if passwords do not match, alert user and do not submit form
  const registerBtn = e => {
    if (confirmPassword !== password) {
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
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          clearForm();
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
    <div>
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
  );
};

export default Register;
