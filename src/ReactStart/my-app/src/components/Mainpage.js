import React from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Dropdown, DropdownButton} from 'react-bootstrap';

function Mainpage() {  
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
              <Nav.Link className="ml-auto" href="./CreateGroup">Create Group</Nav.Link>
            </NavItem>
            <NavItem className="ml-auto">
              <Nav.Link className="ml-auto" href="#">Logout</Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center text-light">Find your group or event</h1>
            <p className="lead text-center text-light">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="w-100">
              <form>
                <div className="input-group">
                    <DropdownButton className="btn btn-primary search_buttons" id="search_type" title="Type">
                    <Dropdown.Item href="#">Group</Dropdown.Item>
                    <Dropdown.Item href="#">Event</Dropdown.Item>
                  </DropdownButton>
                  <input id="searched_text" className="form-control main_search" type="text" placeholder="Enter group or event" name="searched_item"/>
                  <button className="btn btn-primary search_buttons px-5" type="button">Search</button> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </header>
  );
}

export default Mainpage;