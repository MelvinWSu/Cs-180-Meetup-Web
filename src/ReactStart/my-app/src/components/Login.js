import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import fire from '../fire';

function checkLogin() {

  console.log("checking...")
  var usersRef = fire.database().ref('users').orderByKey();
    usersRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        console.log("Key: " +key);
        var childData = childSnapshot.val();
        console.log("Data: " + childData);
        console.log("Email: " + childData.email);
        console.log("Pwd: " + childData.pwd);
        if (document.getElementById("login_email").value == childData.email) {
          if (document.getElementById("login_password").value == childData.pwd) {
            alert("Access avail");
          }
        }
      });
    });
  
}

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
                  <Button onClick = {checkLogin}>Login</Button>
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