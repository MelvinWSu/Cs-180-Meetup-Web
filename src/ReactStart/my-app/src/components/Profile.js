import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class Profile extends Component{

  //props allows us to create tags when we call an object
  //ex:<Welcome name = Sara />;
  constructor(props){
    super(props)  
    
    /*
    this.first_name = props.first_name
    this.last_name = props.last_name 
    this.bio = props.bio
    this.picture = props.pic
    this.uniqueLink = props.link
    this.email = props.email
    this.password= props.password
    */

   this.first_name = "Kevin"
   this.last_name = "is Awesome"
   this.bio = "Kevin is Awesome, right?"
   this.picture = props.pic
   this.uniqueLink = "tesstlink"
   this.email = "Kevinisawesome@gmail.com"
   this.password= props.password
    //Now when we call a Profile object, we will be able to display the contents correctly

  }

  //a function to generate the uniqueLink
  getUniqueLink(){
    return(null);
  }

  render(){

    return(

      <div>
        <ProfilePage first_name = {this.first_name} 
                     last_name = {this.last_name} 
                     bio = {this.bio}  
                     pic = {this.picture}
                     link = {this.uniqueLink}
                     email ={this.email} />
      </div>


    )
  }

}

function ProfilePage(props) {
  return (
    <Router>

    <Route> path = "/".concat(props.first_name)+ </Route>
    <header>
      <Navbar bg="light" expand="ex-lg">
        <Navbar.Brand href="./main">Meetup</Navbar.Brand>
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
                  <a href="#"><img class="rounded-circle" src={img_placeholder} alt="img_placeholder"/></a>
                </div>  
              </div>
            </div>
            <div class="col-md-4 px-4 profile_text">
              <div class="row py-2">
                <label class="pr-2"><strong>First Name:</strong></label>
                 {props.first_name}
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>Last Name:</strong></label>
                {props.last_name}
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>E-mail:</strong></label>
                {props.email}
              </div>
            
            </div>
          </div>
        </div>
        <div class="container mt-4 py-4">
          <p class="py-2 profile_text"><strong>About Me:</strong></p>
          {props.bio}
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
  );
}