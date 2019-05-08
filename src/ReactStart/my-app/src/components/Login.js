import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import fire from '../fire';

const check_login = async(email, pwd) => {
  var isError = false;
  fire.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
    alert(error.message);
    isError = true;
  });
  if (!isError) {
    var getUID = fire.database().ref("users");
    getUID.orderByChild('email').equalTo(email).on("value", function(snapshot) {
      snapshot.forEach(function(child) { 
        window.location.href = 'profile/user/' + child.key;
      })
    });
  }
  else {
    alert("Wait, you are already logged");
  }
}

function Login_control() {
  var email = document.getElementById("login_email").value;
  var pwd = document.getElementById("login_password").value;
  check_login(email,pwd);
}

//really want toSubmit back, i'm used to hitting enter to log in to things
function Login() {
  return (
    <header>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="./main">Meetup</Navbar.Brand>
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
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-md-6 mx-auto">
            <div className="card signup_card my-4">
              <div className="card-body mx-3">
                  <div className="form-group p-3 text-center">
                    <h4>Log in</h4>
                  </div>
                  <div className="form-group">
                    <input id="login_email" className="form-control" type="text" placeholder="E-mail" name="e_mail" required/>
                  </div>
                  <div className="form-group">
                    <input id="login_password" className="form-control" type="password" placeholder="Password" name="password" required/>
                  </div>
                  <Button onClick = {Login_control}>Login</Button>
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