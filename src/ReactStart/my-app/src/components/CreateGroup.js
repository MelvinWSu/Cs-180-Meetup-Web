import React, {Component}  from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import logo from './pics/logo.png';
import fire, {auth} from '../fire';
import Logout from './Logout';
import forwardToProfile from './forwardToProfile'

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group_name: '',
      photo: '',
      group_bio: '',
      member_list: [''],
      event_list: [''],
      leader: ''
    }
  }


  async addGroup() {
    var self = this;
    console.log(self);
    self.state.group_name = document.getElementById("creategroup_name").value;
    self.state.group_bio = document.getElementById("creategroup_bio").value;
    auth.onAuthStateChanged(function (user){
      if (user) {
        var ref = fire.database().ref("users");
        ref.orderByChild("email").equalTo(user.email).on("value", function(snapshot){
          snapshot.forEach(function(data) {
            console.log(data.key);
            self.state.leader = data.key
            self.state.member_list = [data.key]
          })
        })
      }
    })
    await console.log(self);
    var newGroup = fire.database().ref("groups").push(self.state);
    
    var getGrouplist = fire.database().ref("users/" + self.state.leader + "/groups")
    getGrouplist.once("value").then(function (snapshot1) {
      var currGroupList = snapshot1.val()
      alert(currGroupList)
      currGroupList.push(newGroup.key)
      getGrouplist.update(currGroupList)
    })
    var getFirebase = fire.database().ref();
    getFirebase.once("value", function(snapshot) {
        fire.database().ref().update({getFirebase: snapshot.child("groups").numChildren()});
      });
    alert("Group Creation Successful");
    window.location.href = "group/" + newGroup.key
    ;
  }

  handleProfileButtonClick() {

    if (auth.currentUser) {

      //get key of current user
      //forward to that profile
      forwardToProfile(auth.currentUser.email);
    }
    else {
      alert("Not Logged On")
      window.location.href = "/"
    }
  }

  componentDidMount() {
    
    auth.onAuthStateChanged(function (user) {
      // handle it
      if (user) {
        var userkey = '';
        console.log("onauthstatechanged");
        console.log(user);
        console.log("current state");
        console.log(this.state);
        var ref = fire.database().ref("users");
        ref.orderByChild("email").equalTo(user.email).on("value", function(snapshot){
          snapshot.forEach(function(data) {
            console.log(data.key);
            userkey = data.key;
          })
        })
      }
    });
  }

  render() {
    return (
      <header>
        <Navbar bg="light" expand="ex-lg">
          <Navbar.Brand className="nav_font" href="/main">
            <img className="nav_logo" src={logo}></img>eetup
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <NavItem className="ml-auto">
                <Nav.Link onClick={this.handleProfileButtonClick}>Profile</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" href="./createGroup">Create Group</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" onClick={Logout}>Logout</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <main>
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-md-6 mx-auto">
                <div className="card border-primary creategroup_card">
                  <div className="card-body mx-3">
                    <form>
                      <div className="form-group p-3 text-center">
                        <h4>Create a New Group</h4>
                      </div>
                      <div className="form-group text-center">
                        <a href="#"><img src={group_placeholder} /></a>
                      </div>
                      <div className="form-group">
                        <a>Group Name</a>
                        <input id="creategroup_name" className="form-control" type="text" name="groupname" required />
                      </div>
                      <div className="form-group">
                        <a className="pr-4">Bio</a>
                        <textarea id="creategroup_bio" rows="5" className="form-control" type="text" name="groupbio" required></textarea>
                      </div>
                      <Button onClick = {this.addGroup.bind(this)}>Create Group</Button>
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
}

export default CreateGroup;