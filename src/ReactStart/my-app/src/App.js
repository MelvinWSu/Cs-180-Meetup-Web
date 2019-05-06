import React from 'react';
import './App.css';
import { Button, Card, Form, Navbar, Nav, FormControl, Row, Col, Container} from 'react-bootstrap';
import LoginPage from './LoginPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import CreateGroup from './components/CreateGroup'
import CreateEvent from './components/CreateEvent'
import Group from './components/Group'
import Homepage from './components/Homepage'
import Mainpage from './components/Mainpage'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import DisplayPage from './DisplayPage'

function App() {

  return (
    <Router>
      <div className="App">
        <Route exact path = "/" component = {Homepage} />
        <Route path = "/CreateGroup" component = {CreateGroup} />
        <Route path = "/CreateEvent" component = {CreateEvent} />
        <Route path = "/Group" component = {Group} />
        <Route path = "/Login" component = {Login} />
        <Route path = "/main" component = {Mainpage} />
        <Route path = "/Profile" component = {Profile} />
        <Route path = "/Signup" component = {Signup} />
        <Route path = "/LoginPage" component = {LoginPage} />
      </div>
    </Router>

  );

}

export default App;
