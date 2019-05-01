import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';

function Profile() {
  return (
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
                <input id="profile_firstName" class="" type="text" name="profile_firstName"/>
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>Last Name:</strong></label>
                <input id="profile_lastName" class="" type="text" name="profile_lastName"/>
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>E-mail:</strong></label>
                <input id="profile_email" class="" type="text" name="profile_email"/>
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>Birthday:</strong></label>
                <input id="profile_bday" class="" type="text" name="profile_bday"/>
              </div>
              <div class="row py-2">
                <label class="pr-2"><strong>Hometown:</strong></label>
                <input id="profile_city" class="" type="text" name="profile_city"/>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-4 py-4">
          <div class="row">
            <p class="py-2 profile_text"><strong>About Me:</strong></p>
            <textarea id="profile_bio" class="w-100 about_box" type="text" name="profile_bio"></textarea>
          </div>
        </div>
        <div class="row">
          <p class="pb-4 profile_text"><strong>Groups:</strong></p>
        </div>
        <div class="row">
          <div class="col-lg-3 py-4">
            <div class="card">
              <div class="card-head">
                <p class="card-text text-center"><strong>Group name</strong></p>
              </div>
              <img class="card-img-top" src={group_placeholder} alt="group_placeholder"/>
                <div class="card-body">
                  <p class="card-text">This will be placeholder text for the description of the group's bio.</p>
                </div>
            </div>
          </div>
          <div class="col-lg-3 py-4">
            <div class="card">
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
      </main>
    </header>
  );
}

export default Profile;