import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './Pages/Signin';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin/' component={Signin} />
    </Router>
  );
}

export default App;
