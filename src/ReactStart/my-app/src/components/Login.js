import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import fire, {auth, provider} from '../fire';
import Logout from './Logout';
import forwardToProfile from './forwardToProfile';
import logo from './pics/logo.png';

//really want toSubmit back, i'm used to hitting enter to log in to things

class Login extends Component {

  constructor(){
    super()

    this.state = {
      currentUser : null,
      loggedOn : false,
      uniqueKey : ''
    }

  }
  
  Login_control() {

    
    var email = document.getElementById("login_email").value;
    var pwd = document.getElementById("login_password").value;
    //this.check_login(email,pwd);
    //=======================================================================
    const check_login = async(email, pwd) => {
      
       var isError = false;
      auth.signInWithEmailAndPassword(email, pwd).catch(function(error) {
        alert(error.message);
        isError = true;
      });
      if (!isError) {
        console.log("Checking credentials...")
      }
      else {
        alert("Wait, you are already logged");
      }

      
    
    }
    
    //=====================================================================
    check_login(email,pwd)

  }
  
  componentDidMount(){

    console.log("Current User:")
    console.log(auth.currentUser)

    console.log("myStates:")
    console.log(this.state)
    auth.onAuthStateChanged((user) => {
        
      console.log("onauthstatechanged")
      if (user) {

        console.log("user:")
        console.log(user)

        this.setState({ currentUser:user,
        loggedOn : true,
       });
       
       forwardToProfile(user.email)
      } 
      else{
        console.log("No one logged on")
      }
    });
  

    
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
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-md-6 mx-auto">
              <div className="card border-primary signup_card my-4">
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
                    <Button onClick = {this.state.currentUser ? () => {alert("Logged already"); window.location.href = "./main";}:this.Login_control }>Login</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>
      </header>
    );
  }
}

export default Login;