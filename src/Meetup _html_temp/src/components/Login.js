import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

function Login() {
  return (
    <header>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="./">Meetup</Navbar.Brand>
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
      <div class="container h-100">
        <div class="row align-items-center h-100">
          <div class="col-md-6 mx-auto">
            <div class="card signup_card my-4">
              <div class="card-body mx-3">
                <form id="login_form" action="#" method="post">
                  <div class="form-group p-3 text-center">
                    <h4>Log in</h4>
                  </div>
                  <div class="form-group">
                    <input id="login_email" class="form-control" type="text" placeholder="E-mail" name="e_mail" required/>
                  </div>
                  <div class="form-group">
                    <input id="login_password" class="form-control" type="password" placeholder="Password" name="password" required/>
                  </div>
                  <div class="form-group pt-3">
                    <button id="login_loginAccount" class="btn btn-primary btn-block" type="submit" name="login_button">Log In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </header>
  );
}

export default Login;