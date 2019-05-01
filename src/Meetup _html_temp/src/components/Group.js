import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';

function Group() {
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
        <div class="container">
          <div class="row group_row">
            <div class="col-md-4">
              <img src={group_placeholder}/>
            </div>
            <div class="col-xs-4">
              <h3>Group Name goes here plus some more text</h3>
              <p>Bio goes here plus some more text</p>
            </div>
          </div>
        </div> 
        <div class="container">
          <div class="row group_row">
            <div class="col-xs-4">
              <h3 class="py-4">Events</h3>
              <div class="card group_card">
                <div class="card-body">
                  <h5 class="card-title">Event Title</h5>
                  <div class="card-text">
                    <p>Event Details </p>
                  </div>
                  <div class="card-bottom">
                    <img src="#" alt="profile_img"/>
                    <form>
                      <div class="text-right">
                        <button id="join_event" class="btn btn-info" type="button" name="join_event">Join Event</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-4 offset-md-1">
              <h3 class="py-4">Members</h3>
              <div class="card member_card">
                <div class="card-body">
                  <h5 class="card-title">Organizer</h5>
                  <div class="card-img">
                    <img src="#" alt="member_image"/>
                  </div>
                </div>
              </div>
              <div class="card member_card">
                <div class="card-body">
                  <h5 class="card-title">Members</h5>
                  <div class="card-img">
                    <img src="#" alt="member_image"/>
                    <img src="#" alt="member_image"/>
                    <img src="#" alt="member_image"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div class="container">
          <div class="row group_row">
            <h3>Discussion</h3>
          </div>
          <div class="row">
          <div class="col-xs-4">
            <form action="#" method="get">
              <div class="form-group">
                <textarea id="groupdis_text" class="form-control dis_card" type="text" rows="4" placeholder="Enter your message here" name="groupdis_text" required></textarea>
                <div class="text-right">
                  <button id="submit_message" class="btn btn-primary" type="button">Enter message</button>
                </div>
              </div>
            </form>
          </div>
          </div>
        </div> 
      </main>
    </header>
  );
}

export default Group;