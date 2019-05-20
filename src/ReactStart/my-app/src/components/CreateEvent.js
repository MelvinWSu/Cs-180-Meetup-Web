import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import fire from '../fire';
import { groupKey } from './Group.js';

let event_details = {
  event_name: '',
  time: '',
  desc: '',
  loc: '',
  member_list: ['']
}

function addEvent() {
  event_details.event_name = document.getElementById("createevent_name").value;
  event_details.time = document.getElementById("createevent_time").value;
  event_details.loc = document.getElementById("createevent_loc").value;
  event_details.desc = document.getElementById("createevent_desc").value;
  //fire.database().ref("events").push(event_details);
  //var groupKey = fire.database().ref("groups/-LeAfChB-c2AJMC5huX_").key; 
  fire.database().ref("groups/" + groupKey + "/event_list").push().set(event_details);

  var event_num = fire.database().ref();
  event_num.once("value", function(snapshot) {
      fire.database().ref().update({event_num: snapshot.child("events").numChildren()});
    });
  alert("Event Creation Successful");
}

function CreateEvent() {
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
              <Nav.Link className="ml-auto" href="./create_event">Create Event</Nav.Link>
            </NavItem>
            <NavItem className="ml-auto">
              <Nav.Link className="ml-auto" href="#">Logout</Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div class="container h-100">
          <div class="row align-items-center h-100">
            <div class="col-md-6 mx-auto">
              <div class="card createevent_card">
                <div class="card-body mx-3">
                  <form>
                    <div class="form-group p-3 text-center">
                      <h4>Create a New Event</h4>
                    </div>
                    <div class="form-group text-center">
                      <a href="#"><img src={img_placeholder} /></a>
                    </div>
                    <div class="form-group">
                      <a>Event Name</a>
                      <input id="createevent_name" class="form-control" type="text" name="eventname" required />
                    </div>
                    <div class="form-group">
                      <a>Event Time</a>
                      <input id="createevent_time" class="form-control" type="text" name="eventtime" required />
                    </div>
                    <div class="form-group">
                      <a>Event Location</a>
                      <input id="createevent_loc" class="form-control" type="text" name="eventloc" required />
                    </div>
                    <div class="form-group">
                      <a class="pr-4">Details</a>
                      <textarea id="createevent_desc" rows="5" class="form-control" type="text" name="eventdetails" required></textarea>
                    </div>
                    <Button onClick = {addEvent}> Create Event </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </header>
  );
}

export default CreateEvent;