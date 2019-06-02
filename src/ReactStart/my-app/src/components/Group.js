import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Form, Navbar, NavItem } from 'react-bootstrap';
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
      listOfPositions: [],
      eventList: [],
      memberList: [],
      userKey : null,
      currentUser : null,
      editing: false,
      permission: false
     }
    //this.joined = false;

    this.handleJoin = this.handleJoinGroup.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }
  
  getData() {
    console.log("getData")
    setTimeout(() => {
      var self = this;
      var usersRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1]);
      usersRef.once("value").then(function (snapshot) {
        self.setState({
          group_name: snapshot.val().group_name,
          group_bio: snapshot.val().group_bio,
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

  handleEditButton = () => {

    console.log("current states:")
    console.log(this.state)
    setTimeout( () => {
      var self = this;
      
      if (self.state.editing == false){
        self.setState({
          editing : true
        })  
      }
      else{
        self.setState({
          editing:false
        })
      }
    })
  }  

  componentDidMount() {

    console.log("componentDidMount")
    console.log("initial state:")
    console.log(this.state)
    var self = this
    
    console.log("onAuthStateChanged")  
    auth.onAuthStateChanged(function (user) {
      
      if(user){
        console.log("user is logged on ")
        console.log(user)
        
        self.setState( {
          currentUser: user,
        })
        
        var ref = fire.database().ref("users");
        ref.orderByChild("email").equalTo(self.state.currentUser.email).on("value", function(snapshot){
          snapshot.forEach(function(data) {
             
            self.setState({userKey: data.key, permissions: true})
            
            var groups = data.child("groups");

            var memberListRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/member_list")
            memberListRef.once("value").then(function (snapshot) {
              
              var list = snapshot.val()
              console.log("<<<<list>>>>")
              console.log(list)
              console.log("userKey")
              console.log(self.state.userKey)
              for( var i in list){
                if (list[i] == self.state.userKey){
                  console.log("FOUND")
                  self.setState({joined: true})
                }
              }
    
            })

          });
          console.log("done with setting USERKEY")
        })

     
      }
      else{
        console.log("No user logged")
      }

      
    });

    self.getData()
      
  }

  handleJoinGroup = (event) => {
    event.preventDefault();
    console.log("handle join")

    if (!this.state.joined){
      var self = this;

      setTimeout(() =>  {
      self.setState({joined: true})
      
      var userkey = null;
      var userRef = fire.database().ref("users/" + self.state.userKey + "/groups");
      console.log("userRef")
      console.log(userRef)
      userRef.once("value").then(function (snapshot) {
        var groupList = snapshot.val()
        snapshot.numChildren()
        console.log("groupList")
        console.log(groupList);
        userRef.push(window.location.pathname.split('/group/')[1])        
      });
      var groupRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/member_list")
      groupRef.push([self.state.userKey])
      groupRef.once("value").then(function (snapshot) {  
        self.setState({memberList: snapshot.val()})
      });
      console.log("pushed user in member_list");
      console.log("after push state")
      console.log(self.state)
      }); 
    }
    else{
      var self = this;

      //delete group in user database
      
      setTimeout(() =>{
      
      var userRef = fire.database().ref("users/" + self.state.userKey + "/groups");
      userRef.once("value").then(function (snapshot) {
          var groupList = snapshot.val()
          console.log("IN GROUPLIST DELETION")
          console.log(groupList)
          console.log(snapshot.numChildren())
          for(var key in groupList){
            console.log(key)
            console.log(groupList[key])
            if(groupList[key] == window.location.pathname.split('/group/')[1]){
              console.log("deleting in GroupList ")
              delete groupList[key]
              console.log(console.log(groupList))
            }
          }
          userRef.set(groupList)
      });
      //delete user in member_list
      var groupRef = fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/member_list")
      groupRef.once("value").then(function (snapshot) {
        var theMemberList = snapshot.val()
        console.log("theMemberList type")
        console.log(typeof(theMemberList))
        var newList = []
        for(var i in theMemberList){
          console.log("i:")
          console.log(i)
          if(theMemberList[i] != self.state.userKey){
            newList.push(theMemberList[i])
          }
        }
        groupRef.set(newList)
        self.setState({memberList: newList})
        self.setState({joined: false})
        });
      }); 
    }
    
  }
  handleEditSubmit = () => {
    var new_group_name = document.getElementById("group_edit_name").value;
    var new_group_bio = document.getElementById("group_edit_bio").value;

    var getKey = window.location.pathname.split('/group/')[1]

    fire.database().ref("groups/" + getKey).update({
      group_name: new_group_name,
      group_bio: new_group_bio,
    });

    var self = this

    self.setState({
      group_name: new_group_name,
      group_bio: new_group_bio,
      editing : false
    })
  }

  handleEditRender(props){
    return (
      <div class="col-xs-4">
        <h3>Group Name</h3>
        <div className="form-group">
          <input id = "group_edit_name" type="text" placeholder={props.group_name} required/>
        </div>
        <p>Group Bio</p>
        <div className="form-group">
          <Form.Control id = "group_edit_bio" as="textarea" rows="3" placeholder={props.group_bio} />
        </div>
        <Button onClick = {props.submit}> Submit </Button>
      </div>
    )
  }
  handleViewRender(props){
    return (
      <div class="col-xs-4">
        <h3>{props.group_name}</h3>
        <p>{props.group_bio}</p>
      </div>
    )
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
          <div class = "row justify-content-md-center">
          <div class="container">
            <div class="row group_row">
              <div class="col-md-4">
                <img src={group_placeholder}/>
                <div class="col-md-12">
                  <input id="join_group" class="btn btn-info" type="button" value= {!this.state.joined ? "Join" : "Leave Group"} onClick={this.handleJoin}></input>
                  <Button variant = {this.state.permissions ? "primary" : "outline-light"} disabled = {!this.state.permissions} onClick = {this.handleEditButton}> {this.state.editing ? 'Cancel Edit' : 'Edit' }</Button>
                </div>
              </div>
              <div class="col-md-4">
                {this.state.editing ? 
                <this.handleEditRender 
                  group_name = {this.state.group_name}
                  group_bio = {this.state.group_bio}
                  submit = {this.handleEditSubmit}
                />
                :
                <this.handleViewRender
                  group_name = {this.state.group_name}
                  group_bio = {this.state.group_bio}
                />
                }
              </div>
            </div>
            <div>
          </div>
          </div> 
          <div class="container">
            <div class="row group_row">
              <div class="col-xs-6">
                <div class="row">
                  <h3 class="py-4 mr-4" >Events</h3>
                  {<a class="btn btn-primary ml-auto my-auto" onClick = {this.goToCreateEvent}>Create Event</a>
                  }
                </div>
                
                {Object.keys(this.state.eventList).slice(1,this.state.eventList.length).map((Key) =>     
                  <div>
                    <Row>
                      <EventCard content = {this.state.eventList[Key]} groupID = {window.location.pathname.split('/group/')[1]} index = {Key} currentUser = {this.state.userKey} />
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
            <div class = "col-sm-12">
              <div class= "card">
                <div class = "card-body text-left scroll">
                  {displayList()} 
                  <div class="form-group">
                    <textarea id="groupdis_text" class="form-control dis_card" type="text" rows="4" placeholder="Enter your message here" name="groupdis_text" required></textarea>
                    <div class="text-right">
                      <button id="submit_message" class="btn btn-primary" onClick = {saveMessage}>Enter message</button>
                    </div>
                  </div>                 
                </div>
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

async function saveMessage() {
  var date = new Date().getTime();
  var str = new Date(date);
  var mess = document.getElementById("groupdis_text").value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  await auth.onAuthStateChanged(function(user){
    if (user) {
      fire.database().ref('groups/' + window.location.pathname.split('/group/')[1] + '/messages').push({
        name: user.email,
        timestamp: str.toString(),
        message: mess
      });
    }
  })
  document.location.reload();
}

function displayList() {
  var message_list = [];
  var ref = fire.database().ref('groups/' + window.location.pathname.split('/group/')[1] + "/messages");
  ref.orderByKey().on("value", function(snapshot){
    snapshot.forEach(function(data){
      message_list.push({
        email: data.val().name,
        message: data.val().message,
        time: data.val().timestamp,
        key: data.key
      });
    })
  })
  return message_list.map(item => {
    return (
      <div>
        <p class = "card-text" key = {item.key}>
          <small class = "text-muted" >
            <img src={group_placeholder} width="50" height = "50"/>
            {item.email}
          </small>
        </p>
        <p class = "card-text" key={item.key}>
          <pre>
            {item.message}
          </pre>
        </p>
        <p class = "card-text" key = {item.key}>
          <small class= "text-muted">
            {item.time}
          </small>
        </p>
        <hr></hr>
      </div>
    );
  });
}

export default Group;