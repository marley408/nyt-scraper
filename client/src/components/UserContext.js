import React, { useState, createContext } from 'react';
import jwt_decode from 'jwt-decode';

// this is imported to the components that use this provider
export const UserContext = createContext({});

// create user provider. this holds info and passes it down to
export const UserProvider = props => {
  const [id, setId] = useState(null);

  const token = localStorage.getItem('token');
  let decoded = {};
  if (token) {
    decoded = jwt_decode(token);
  }

  // need to set inital state because page will refresh after login or register
  const INITIAL_STATE = {
    id: decoded._id || id,
    setId: setId
  };

  return (
    <UserContext.Provider value={INITIAL_STATE}>
      {props.children}
    </UserContext.Provider>
  );
};
