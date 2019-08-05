import React from 'react';
import Navbar from './components/navbar/Navbar';
import LandingPage from './pages/LandingPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;
