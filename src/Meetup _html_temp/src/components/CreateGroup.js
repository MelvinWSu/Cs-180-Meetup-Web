import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';

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
        <div class="container h-100">
          <div class="row align-items-center h-100">
            <div class="col-md-6 mx-auto">
              <div class="card creategroup_card">
                <div class="card-body mx-3">
                  <form action="#" method="post">
                    <div class="form-group p-3 text-center">
                      <h4>Create a New Group</h4>
                    </div>
                    <div class="form-group text-center">
                      <a href="#"><img src={group_placeholder} /></a>
                    </div>
                    <div class="form-group">
                      <a>Group Name</a>
                      <input id="creategroup_name" class="form-control" type="text" name="groupname" required />
                    </div>
                    <div class="form-group">
                      <a class="pr-4">Bio</a>
                      <textarea id="creategroup_bio" rows="5" class="form-control" type="text" name="groupbio" required></textarea>
                    </div>
                    <div class="py-4">
                      <button id="createGroup" class="btn btn-primary btn-block" type="submit" name="creategroup_button">Create Group</button>
                    </div>
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