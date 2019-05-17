import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import fire from '../fire';
import Profile from './Profile';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
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

class editProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: "loading...",
      last_name: "loading...",
      bio: "loading...",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG/220px-Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG",
      uniqueLink: "loading...",
      email: "https://www.tacobell.com/",
     }
  }
  componentDidMount() {
    
  }

}

const changeInfo = async(email, pwd) => {
  var isError = false;
  await fire.auth().signInWithEmailAndPassword(profile.email, profile.pwd).catch(function(error) {
    alert(error.message);
    isError = true;
  });
  
  if (!isError) {
    alert("Updating profile");
    var getUID = fire.database().ref("users");
    getUID.orderByChild('email').equalTo(profile.email).on("value", function(snapshot) {
      snapshot.forEach(function(child) { 
        alert(document.getElementById("edit_firstName").value);
        if (document.getElementById("edit_firstName").value != "") {
          fire.database().ref("users/"+ child.key).update({f_name: document.getElementById("edit_firstName").value})
        }
        if (document.getElementById("edit_lastName").value != "") {
          fire.database().ref("users/"+ child.key).update({l_name: document.getElementById("edit_lastName").value})
        }
        if (document.getElementById("edit_dateOfBirth").value != "") {
          fire.database().ref("users/"+ child.key).update({dob: document.getElementById("edit_dateOfBirth").value})
        }
        if (document.getElementById("edit_city").value != "") {
          fire.database().ref("users/"+ child.key).update({city: document.getElementById("edit_city").value})
        }
        if (document.getElementById("edit_headline").value != "") {
          fire.database().ref("users/"+ child.key).update({headline: document.getElementById("edit_headline").value})
        }
        if (document.getElementById("edit_bio").value != "") {
          fire.database().ref("users/"+ child.key).update({bio: document.getElementById("edit_bio").value})
        }
      })
    });
    return false;
  }
  else {
    alert("cant login");
    return true;
  }
}

function updateInfo(event) {
  //Add to database
  event.preventDefault();
  event.stopPropagation();
  profile.email = document.getElementById("edit_email").value;
  profile.pwd = document.getElementById("edit_pwd").value;
  //reminder to remove password for firebase
  
  //updating the user branch with the given profile information
  var isError = changeInfo(profile.email, profile.pwd);
  
  //at this point the database has added the signup information
  //how do I render a new route?
  if (!isError) {
    var getUID = fire.database().ref("users");
    getUID.orderByChild('email').equalTo(profile.email).on("value", function(snapshot) {
      snapshot.forEach(function(child) { 
        window.location.href = 'profile/user/' + child.key;
      })
    });
  }
  
}


function EditProfile() {
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
                  <h4>Change Info</h4>
                </div>
                <div className="form-group">
                <div className="form-group">
                  <div>Please enter your email and password for authentication</div>
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input id="edit_email" className="form-control" type="text" placeholder="Email" name="email" required/>
                    </div>
                    <div className="col-md-6">
                      <input id="edit_pwd" className="form-control" type="text" placeholder="Password" name="password" required/>
                    </div>
                  </div>
                </div>
                <hr class="divider"></hr>
                <div className="form-group">
                  <div>Leave fields blank to keep sections the same</div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input id="edit_firstName" className="form-control" type="text" placeholder="First Name" name="first_name"/>
                    </div>
                    <div className="col-md-6">
                      <input id="edit_lastName" className="form-control" type="text" placeholder="Last Name" name="last_name"/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input id="edit_dateOfBirth" className="form-control" type="text" placeholder="Date of Birth" name="date_of_birth"/>
                    </div>
                    <div className="col-md-6">
                      <input id="edit_city" className="form-control" type="text" placeholder="City" name="city"/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input id="edit_headline" className="form-control" type="headline" placeholder="Headline" name="headline"/>
                </div>
                <div className="form-group">
                  <input id="edit_bio" className="form-control" type="bio" placeholder="Bio" name="bio"/>
                </div>
                <Button onClick={updateInfo}>
                Update Profile
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}

export default EditProfile;