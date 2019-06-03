import React, {Component} from 'react';
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
import Account from './components/Account'
import EditProfile from './components/EditProfile'
import fire from './fire.js'
import dynamicfieldpractice from './components/dynamicfield-practice'
import PeopleCard from './components/PeopleCard'

class App extends Component{

  constructor(){
    super()
    
      
  }
  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path = "/" component = {Homepage} />
          <Route path = "/CreateGroup" component = {CreateGroup} />
          <Route path = "/createEvent/:groupkey" component = {CreateEvent} />
          <Route path = "/group/:key" component = {Group} />
          <Route path = "/Login" component = {Login} />
          <Route path = "/main" component = {Mainpage} />
          <Route path = "/profile/user/:key" component = {Profile} />
          <Route path = "/Signup" component = {Signup} />
          <Route path = "/LoginPage" component = {LoginPage} />
          <Route path = "/Account" component = {Account} />
          <Route path = "/EditProfile" component = {EditProfile} />
          <Route path = "/dyn" component = {dynamicfieldpractice} />
        </div>
      </Router>

    );
  }

}

export default App;
