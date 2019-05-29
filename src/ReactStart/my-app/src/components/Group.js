import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Carousel, Row, Col } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import fire, {auth} from '../fire';
import EventCard from './EventCard';

class Group extends Component {
  constructor(props) {
    super(props);
    var self = ''
    var key = this.props.match.params.key;
    this.state = {
      group_name: "loading...",
      group_bio: "loading...",
      values: [],
      joined : false,
      eventList: [],
      memberList: [],
      userKey : null,
      currentUser : null
     }
    //this.joined = false;

    this.handleJoin = this.handleJoinGroup.bind(this)
    
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
    console.log("getData")
    setTimeout(() => {
      var self = this;
      var usersRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1]);
      usersRef.once("value").then(function (snapshot) {
        self.setState({
          group_name: snapshot.val().group_name,
          group_bio: snapshot.val().bio,
          eventList: snapshot.val().event_list,
          memberList : snapshot.val().member_list
        })

        console.log("updated State")
        console.log(self.state)



      });
    }, 100)
  }

  goToCreateEvent = (event) => {    
    window.location.href = "/createEvent/" + window.location.pathname.split('/group/')[1];
    event.preventDefault();
  }

  componentDidMount() {

    console.log("componentDidMount")
    console.log("initial state:")
    console.log(this.state)
    var self = this
    self.getData()
    console.log("onAuthStateChanged")  
    auth.onAuthStateChanged(function (user) {
      
      if(user){
        console.log("user is logged on ")
        console.log(user)
      
        self.setState( {
          currentUser: user,
        })
        

      }
      else{
        console.log("No user logged")
      }

      
    });
      
  }

  handleJoinGroup = () => {

    console.log("handle join")

    if (!this.state.joined){
      

      setTimeout(() =>  {
      var self = this;
      self.setState({joined: true})
      
      var userkey = null;
      var ref = fire.database().ref("users");
      console.log("states")
      console.log(self.state)
      ref.orderByChild("email").equalTo(self.state.currentUser.email).on("value", function(snapshot){
        snapshot.forEach(function(data) {

          
          console.log("data")
          console.log(data);
          console.log(data.key);
          self.setState({userKey: data.key})
          
          var groups = data.child("groups");
          var x = document.getElementById("join_group");
          

          console.log()
          fire.database().ref("users/" + self.state.userKey + "/groups").update([window.location.pathname.split('/group/')[1]]);
          fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/member_list").push([self.state.userKey])
          console.log("pushed user in member_list");
          

        });
      })},100)
      
    

    }
    else{

      //"NEEDS TO BE HANDLED"
    }

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
                <input id="join_group" class="btn btn-info" type="button" value= {!this.state.joined ? "Join" : "Already Joined"} onClick={this.handleJoin}></input>
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
                  {<a class="btn btn-primary ml-auto my-auto" onClick = {this.goToCreateEvent}>Create Event</a>
                  }
                </div>
                {/* SPLIT EVENT_LIST ARRAY INTO SEPARATE ITEMS */}
                { console.log("this state: ")}
                 { console.log(this.state)}
                 {console.log("type of eventList")}
                 {console.log(typeof(this.state.eventList))}
                 {console.log("this.state.eventList: ")}
                 {console.log(Object.keys(this.state.eventList).slice(1,this.state.eventList.length))}
                  {Object.keys(this.state.eventList).slice(1,this.state.eventList.length).map((Key) => 
                    
                    <div>
                    <Row>
                    <EventCard content = {this.state.eventList[Key]} index = {Key} />
                    </Row>
                    </div>
                  )}
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