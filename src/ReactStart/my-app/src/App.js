import React from 'react';
import './App.css';
import { Button, Card, Form, Navbar, Nav, FormControl, Row, Col, Container} from 'react-bootstrap';
import Login from './LoginPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'



function App() {

  return (
    <Router>
    <div className="App">
      
      <Route exact path = "/" component = {Login} />
      
    </div>
    </Router>

  );

}

export default App;
