import React from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import SavedArticles from './pages/SavedArticles';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/saved" component={SavedArticles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
