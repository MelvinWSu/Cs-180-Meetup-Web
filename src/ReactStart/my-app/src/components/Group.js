import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import fire, {auth} from '../fire';

class Group extends React.Component {
  constructor(props) {
    super(props);
    var self = ''
    var key = this.props.match.params.key;
    this.state = {
      group_name: "loading...",
      group_bio: "loading...",
      values: [],
      joined : false
     }
    this.joined = false;
  }

  buttonClicked(event) {
    var self = this;
    if (self.state.joined != true) {
      alert("Joined Group");
      self.state.joined = true;
      auth.onAuthStateChanged(function(user){
        if (user) {
          var userkey = '';
          var ref = fire.database().ref("users");
          ref.orderByChild("email").equalTo(user.email).on("value", function(snapshot){
          snapshot.forEach(function(data) {
            console.log(data.key);
            userkey = data.key;
          })
        })
        fire.database().ref("users/" + userkey + "/groups").update([window.location.pathname.split('/group/')[1]]);
        
        fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/member_list").push([userkey])
        console.log("1");
        }
      });
    }
    else {
      alert("Already in Group");  
      console.log("0");
    }
  }
  
  getData() {
    setTimeout(() => {
      var self = this;
      var usersRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1]);
      usersRef.once("value").then(function (snapshot) {
        self.setState({
          group_name: snapshot.val().group_name,
          group_bio: snapshot.val().bio,
        })
      });
    }, 100)
  }

  goToCreateEvent(event) {    
    window.location.href = "/createEvent/" + window.location.pathname.split('/group/')[1];
    event.preventDefault();
  }

  componentDidMount() {
    var self = this;
    auth.onAuthStateChanged(function (user) {
      this.state = {
        currentUser: user,
        
      }


      console.log(user)
      var ref = fire.database().ref("users");
      ref.orderByChild("email").equalTo(user.email).on("value", function(snapshot){
        snapshot.forEach(function(data) {
          console.log(data);
          console.log(data.ref_.path.pieces_[1]);
          var groups = data.child("groups");
          var x = document.getElementById("join_group");
          groups.forEach(function(data2){
            if (data2.val() === window.location.pathname.split('/group/')[1]) {
              console.log(data2.val());
              self.state.joined = true;
            }
          })
          if (self.state.joined != true) {
            x.value = "  Join Group  ";
          }
          else {
            x.value = "Already Joined";
          }
        });
      })
    });  
    this.getData();
  }

  render() {
    return (
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
                <Nav.Link className="ml-auto" href="/create_group">Create Group</Nav.Link>
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
                <input id="join_group" class="btn btn-info" type="button" value= "  Join Group  " onClick={this.buttonClicked.bind(this)}></input>
              </div>
              <div class="col-xs-4">
                <h3>{this.state.group_name}</h3>
                <p>{this.state.group_bio}</p>
              </div>
            </div>
            <div>
          </div>
          </div> 
          <div class="container">
            <div class="row group_row">
              <div class="col-xs-4">
                <div class="row">
                  <h3 class="py-4">Events</h3>
                  <a class="btn btn-primary ml-auto my-auto" onClick = {this.goToCreateEvent.bind(this)}>Create Event</a>
                </div>
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
}

export default Group;