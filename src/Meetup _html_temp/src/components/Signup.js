import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

function Signup() {
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
      <div class="container h-100">
        <div class="row align-items-center h-100">
          <div class="col-md-6 mx-auto">
            <div class="card signup_card">
              <div class="card-body mx-3">
                <form id="signup_form" action="#" method="post">
                  <div class="form-group p-3 text-center">
                    <h4>Register Account</h4>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-6">
                        <input id="signup_firstName" class="form-control" type="text" placeholder="First Name" name="first_name" required />
                      </div>
                      <div class="col-md-6">
                        <input id="signup_lastName" class="form-control" type="text" placeholder="Last Name" name="last_name" required />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input id="signup_email" class="form-control" type="text" placeholder="E-mail" name="e_mail" required />
                  </div>
                  <div class="form-group">
                    <input id="signup_password" class="form-control" type="password" placeholder="Password" name="password" required />
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-6">
                        <input id="signup_birth" class="form-control" type="text" placeholder="Date of Birth" name="date_of_birth" required />
                      </div>
                      <div class="col-md-6">
                        <input id="signup_city" class="form-control" type="text" placeholder="City" name="city" required />
                      </div>
                    </div>
                  </div>
                  <div class="form-group pt-3">
                    <button id="signup_createAccount" class="btn btn-primary btn-block" type="submit" name="signup_button">Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Signup;