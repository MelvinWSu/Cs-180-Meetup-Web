import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import fire, {auth, provider} from '../fire';
import Profile from './Profile';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Logout from './Logout';
import forwardToProfile from './forwardToProfile';

let profile = {
      f_name: '',
      l_name: '',
      email: '',
      pwd: '',
      dob: '',
      city: '',
      photo: '',
      headline: '',
      bio: '',
      groups: ['']
}


class Signup extends Component{
  constructor(){
    super();

    this.state = {currentUser: null,
                  loggedOn : false}
  }
  
  Signup_control(event) {
    //Add to database

    const accountCreation = async(email, pwd) => {
      var isError = false;
      await fire.auth().createUserWithEmailAndPassword(profile.email, profile.pwd).catch(function(error) {
        alert(error.message);
        isError = true;
      });
      if (!isError) {
        alert("Account Made");
        profile.f_name = document.getElementById("signup_firstName").value;
        profile.l_name = document.getElementById("signup_lastName").value;
        profile.dob = document.getElementById("signup_dateOfBirth").value;
        profile.city = document.getElementById("signup_city").value;
        fire.database().ref("users").push().set(profile);
        
        var user_num = fire.database().ref();
        user_num.once("value", function(snapshot) {
          fire.database().ref().update({user_count: snapshot.child("users").numChildren()});
        });
        
        
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
      forwardToProfile(profile.email)
      }
      

    }

    event.preventDefault();
    event.stopPropagation();

    profile.email = document.getElementById("signup_email").value;
    profile.pwd = document.getElementById("signup_password").value;
    //reminder to remove password for firebase
    
    //updating the user branch with the given profile information
    var isError = accountCreation(profile.email, profile.pwd);
    
    //at this point the database has added the signup information
    //how do I render a new route?
    
  }

  componentDidMount(){
    
    console.log(this.state)
    auth.onAuthStateChanged((user) => {

      if(user){  
    
        this.setState({ currentUser:user,
        loggedOn : true
        });

        console.log("user logged on")
        console.log(this.state)
      }
      else{
        console.log("no one logged on ")
      }
    
  });
}
  

  render(){
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
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-md-6 mx-auto">
              <div className="card signup_card">
                <div className="card-body mx-3">
                  
                    <div className="form-group p-3 text-center">
                      <h4>Register Account</h4>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <input id="signup_firstName" className="form-control" type="text" placeholder="First Name" name="first_name" required />
                        </div>
                        <div className="col-md-6">
                          <input id="signup_lastName" className="form-control" type="text" placeholder="Last Name" name="last_name" required />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input id="signup_email" className="form-control" type="text" placeholder="E-mail" name="e_mail" required />
                    </div>
                    <div className="form-group">
                      <input id="signup_password" className="form-control" type="password" placeholder="Password" name="password" required />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <input id="signup_dateOfBirth" className="form-control" type="text" placeholder="Date of Birth" name="date_of_birth" required />
                        </div>
                        <div className="col-md-6">
                          <input id="signup_city" className="form-control" type="text" placeholder="City" name="city" required />
                        </div>
                      </div>
                    </div>
                    <Button onClick={this.Signup_control}>
                    CreateAccount
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
}

export default Signup;