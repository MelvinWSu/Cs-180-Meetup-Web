import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import logo from './pics/logo.png';

class Homepage extends Component {

  constructor(){
    super()

  }

  componentDidMount(){
  
  }
  render(){
    return (
    <header>
      <Navbar bg="light" expand="md" fixed="top">
        <Navbar.Brand className="nav_font" href="./">
          <img className="nav_logo" src={logo}></img>eetup
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ml-auto">
            <NavItem className="ml-auto"> 
              <Nav.Link className="ml-auto" href="./signup">Signup</Nav.Link>
            </NavItem>
            <NavItem className="ml-auto">
              <Nav.Link className="ml-auto" href="./login">Login</Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div className="home">
        </div>
        <div className="landing_text">
          <img src={logo}></img>
          <strong>
          <h1>Meetup.</h1>
          <p>Find groups that pertain to your interests or events that you might be interested in</p>
          </strong>
          <p>
            <a className="btn btn-lg btn-primary" href="./signup">Sign-up now</a>
          </p>
        </div>
      </main>
    </header>
  );
  }
}

export default Homepage;