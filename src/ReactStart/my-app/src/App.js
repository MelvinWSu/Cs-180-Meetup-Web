import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import { Button } from 'react-bootstrap';
import { ButtonToolbar} from 'react-bootstrap';
function App() {
  return (
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
  );

}

export default App;
