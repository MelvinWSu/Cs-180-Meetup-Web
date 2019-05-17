import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import fire from '../fire';

class Profile extends Component{
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
  
  getData() {
    //url will probably look like Profile/user/<unique key>
    //firebase key, uid from email creation, possible custom gen can be used, firebase key is used
    //ex. http://localhost:3000/Profile/user/-Le-SeIoVd9PzvzwuDi_
    
    //alert(window.location.pathname.split('/user/')[1])
    //Reminder that url is case-sensitive
    setTimeout(() => {
      var self = this;
      var usersRef = fire.database().ref("users/" + window.location.pathname.split('/user/')[1]);
      usersRef.once("value").then(function(snapshot) {
        self.setState({
          first_name: snapshot.val().f_name,
          last_name: snapshot.val().l_name,
          bio: snapshot.val().bio,
          email: snapshot.val().email,
        })  
      });
      document.getElementById('profile_img').style.borderRadius = '50%';
    }, 100)
  }
  
  componentDidMount() {
    this.getData();
  }

  render(){
    return(
      <Router>
      <header>
        <Navbar bg="light" expand="ex-lg">
          <Navbar.Brand href="/main">Meetup</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <NavItem className="ml-auto">
                <Nav.Link href="./profile">Profile</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" href="./create_group">Create Group</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" href="#">Logout</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <main>
          <div class="container mt-4 py-4">
            <div class="row">
              <div class="col-md-4 px-4">
                <div class="card border-0">
                  <div class="card-head">
                    <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG/220px-Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG" height = "300" width = "300" id="profile_img"/>    
                    <div id="filesubmit" action = {uploadImage()}>
                      <input type="file" class="file-select" accept="image/*"/>
                      <button class="file-submit">SUBMIT</button>
                    </div>
                  </div>  
                </div>
              </div>
              <div class="col-md-4 px-4 profile_text">
                <div class="row py-2">
                  <label class="pr-2"><strong>First Name:</strong></label>
                   {this.state.first_name}
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>Last Name:</strong></label>
                  {this.state.last_name}
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>E-mail:</strong></label>
                  {this.state.email}
                </div>
              
              </div>
            </div>
          </div>
          <div class="container mt-4 py-4">
            <p class="py-2 profile_text"><strong>About Me:</strong></p>
            {this.state.bio}
          </div>
          <div class="row">
            <p class="pb-4 profile_text"><strong>Groups:</strong></p>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-4 py-4">
                <div class="card profile_groups">
                  <div class="card-head">
                    <p class="card-text text-center"><strong>Group name</strong></p>
                  </div>
                  <img class="card-img-top" src={group_placeholder} alt="group_placeholder"/>
                  <div class="card-body">
                    <p class="card-text">This will be placeholder text for the description of the group's bio.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 py-4">
                <div class="card profile_groups">
                  <div class="card-head">
                    <p class="card-text text-center"><strong>Group name</strong></p>
                  </div>
                  <img class="card-img-top" src={group_placeholder} alt="group_placeholder"/>
                  <div class="card-body">
                    <p class="card-text">This will be placeholder text for the description of the group's bio.</p>
                  </div>
                </div>
              </div>
            </div>   
          </div> 
        </main>
      </header>
      </Router>
    )
  }
}

function uploadImage() {
};

export default Profile