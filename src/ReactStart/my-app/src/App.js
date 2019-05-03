import React from 'react';
import './App.css';
<<<<<<< HEAD
import Profile from './Login'
import { Button, Card, Form, Navbar, Nav, FormControl, Row, Col, Container} from 'react-bootstrap';
import Login from './LoginPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
=======
import './style.css'
import { Button } from 'react-bootstrap';
import { ButtonToolbar} from 'react-bootstrap';
>>>>>>> 109f64fa8ac97039d1ab19cb2bdd73e72823512c
function App() {

  return (
<<<<<<< HEAD
    <Router>
    <div className="App">
      
      <Route exact path = "/" component = {Login} />
      
    </div>
    </Router>
=======
    <header>
      <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">Meetup</a>
          <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ml-auto">
                <a className="nav-link" href="signup.html">Sign-up</a>
              </li>
              <li className="nav-item ml-auto">
                <a className="nav-link" href="login.html">Login</a>
              </li>
            </ul>
          </div>
        </div>        
      </nav>
    
    <main>
      <div className="home">
      </div>
      <div className="landing_text">
        <h1>Cover your page.</h1>
        <p>Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p>
          <a className="btn btn-lg btn-primary" href="signup.html">Sign-up now</a>
        </p>
      </div>
    </main>
    </header>
>>>>>>> 109f64fa8ac97039d1ab19cb2bdd73e72823512c
  );

}

export default App;
