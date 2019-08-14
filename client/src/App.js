import React from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SavedArticles from './pages/SavedArticles';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/saved" component={SavedArticles} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
