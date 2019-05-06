import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import fire from '../fire';

let group_details = {
  group_name: '',
  photo: '',
  bio: '',
  member_list: [''],
  event_list: ['']
}

function addGroup() {   
  group_details.group_name = document.getElementById("creategroup_name").value;
  group_details.bio = document.getElementById("creategroup_bio").value;
  fire.database().ref("groups").push(group_details);

  var group_num = fire.database().ref();
  group_num.once("value", function(snapshot) {
      fire.database().ref().update({group_num: snapshot.child("groups").numChildren()});
    });
  alert("Group Creation Successful");
}

function CreateGroup() {
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
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-md-6 mx-auto">
              <div className="card creategroup_card">
                <div className="card-body mx-3">
                  <form onSubmit={addGroup}>
                    <div className="form-group p-3 text-center">
                      <h4>Create a New Group</h4>
                    </div>
                    <div className="form-group text-center">
                      <a href="#"><img src={img_placeholder} /></a>
                    </div>
                    <div className="form-group">
                      <a>Group Name</a>
                      <input id="creategroup_name" className="form-control" type="text" name="groupname" required />
                    </div>
                    <div className="form-group">
                      <a className="pr-4">Bio</a>
                      <textarea id="creategroup_bio" rows="5" className="form-control" type="text" name="groupbio" required></textarea>
                    </div>
                    <Button onClick = {addGroup}>Create Group</Button>
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

export default CreateGroup;