import React, {Component} from 'react';
import './style.css';
import { Button, Carousel } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image, Form, Container, Row, Col} from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import fire, {auth} from '../fire';
import Logout from './Logout';
import GroupCard from './GroupCard';
import {storage} from '../fire';

class Profile extends Component{
  constructor(props){
    super(props);

    var key = this.props.match.params.key

    this.state = {
          first_name: "loading...",
          last_name: "loading...",
          bio: "loading...",
          picture: null,
          uniqueLink: "loading...",
          email: "https://www.tacobell.com/",
          groups : [],

          currentUser: null,
          permissions: false,
          editing: false
        }
     this.handleEdit = this.handleEditButton.bind(this);
     this.handleEditSubmit = this.handleEditSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleUpload = this.handleUpload.bind(this);
  }
  
  handleChange = event => {
    if (event.target.files[0]) {
      const picture = event.target.files[0];
      this.setState(() => ({picture}));
    }
  }

  handleUpload = () => {
    const {picture} = this.state;
    const uploadTask = storage.ref(`profile_img/${picture.name}`).put(picture);
    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage.ref('profile_img').child(picture.name).getDownloadURL().then(uniqueLink => {
          console.log(uniqueLink);
          this.setState({uniqueLink});
          
          let getKey = window.location.pathname.split('/user/')[1]
          fire.database().ref("users/" + getKey).update({
            photo: this.state.uniqueLink
          });
        })
      });
  }

  getData() {
    //url will probably look like Profile/user/<unique key>
    //firebase key, uid from email creation, possible custom gen can be used, firebase key is used
    //ex. http://localhost:3000/Profile/user/-Le-SeIoVd9PzvzwuDi_
    
    //alert(window.location.pathname.split('/user/')[1])
    //Reminder that url is case-sensitive
    setTimeout(() => {
      var self = this;
      var usersRef = fire.database().ref("users/" + this.props.match.params.key);
      usersRef.once("value").then(function(snapshot) {
        console.log("snapshot")
        console.log(snapshot.val())
        self.setState({
          first_name: snapshot.val().f_name,
          last_name: snapshot.val().l_name,
          bio: snapshot.val().bio,
          uniqueLink: snapshot.val().photo,
          email: snapshot.val().email,
          groups: snapshot.val().groups
        })
    
        console.log("the updated state")
        console.log(self.state)
        console.log("image url:")
        console.log(self.state.photo)
      });
      
    }, 100)   
  }
  
  componentDidMount() {
    var self = this;
    this.getData();
    
    auth.onAuthStateChanged(function (user) {
      // handle it
      
      console.log("onauthstatechanged")
      console.log(user)
      self.setState({
        currentUser: user,
      })
      console.log("current state")
      console.log(self.state)

      var usersRef = fire.database().ref("users/" + window.location.pathname.split("/user/")[1]);
      usersRef.once("value").then(function(snapshot) {
        if (user.email == snapshot.val().email){

          self.setState({permissions: true})
        }
      });
      

    });

   
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

  handleEditSubmit = () => {
    
    //get info
    var the_first_name = document.getElementById("profile_firstname").value;
    var the_last_name = document.getElementById("profile_lastname").value;
    var the_bio = document.getElementById("profile_bio").value;
    var the_pic = document.getElementById("profile_pic").value;

    console.log("the pic")
    console.log(the_pic)
    
    
    //update info on database
    var getKey = window.location.pathname.split('/user/')[1]

    //initialize firebase storage
    
    var reference = "Profile_Image"
    var key = getKey
    var file = the_pic

    //UploadFile(reference, key, file)

    console.log("the file:")
    console.log(file)
    
    fire.database().ref("users/" + getKey).update({
      f_name: the_first_name,
      l_name: the_last_name,
      bio: the_bio,
      //photo: the_pic
      });
    this.handleUpload()
    
    var self = this
    self.setState({
      first_name: the_first_name,
      last_name: the_last_name,
      bio: the_bio,
      //photo: the_pic,
      editing : false
    })

    console.log(the_first_name + "\n" + the_last_name + "\n" + the_bio + "\n" + getKey)
    //change state


  }

  handleEditRender(props){
    return(
      <div>
        <br/>
        <Button onClick = {props.submit}> Submit </Button>
          <div class="container mt-4 py-4">
            <div class="row">
              <div class="col-md-4 px-4">
              <img src={props.uniqueLink || "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG/220px-Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"} height = "300" width = "300" id="profile_img"/>   
                <div class="card border-0">

                  <div class="card-head">
                    <div id="filesubmit" >
                    <Container>
                        <Row>
                          <Col></Col>
                          <Col>
                          <input id="profile_pic" type="file" class="file-select" accept="image/*" onChange={props.change}/>
                          </Col>
                          <Col></Col>

                        </Row>
                    </Container>
                    </div>
                  </div>  
                </div>
              </div>

              <div class="col-md-4 px-4 profile_text">
                <div class="row py-2">
                  <label class="pr-2"><strong>First Name:</strong></label>
                  <div className="form-group">
                      <input id = "profile_firstname" type="text" placeholder="First Name" name="e_mail" required/>
                  </div>
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>Last Name:</strong></label>
                    <input id = "profile_lastname" type="text" placeholder="Last Name" required/>
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>E-mail:</strong></label>
                  {props.email}
                </div>
              
              </div>
            </div>
          </div>
          <div class="container mt-4 py-4">
            <p class="py-2 profile_text"><strong>About Me:</strong></p>
            <Form.Control id = "profile_bio" as="textarea" rows="3" />
          </div>
      </div>
    );
  }
  handleViewRender(props){
    return(
      
      
      <div>
          <div class="container mt-4 py-4">
            <div class="row">
              <div class="col-md-4 px-4">
              <img src={props.uniqueLink || "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG/220px-Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"} height = "300" width = "300" id="profile_img" />   
                                    
                <div class="card border-0">
                  <div class="card-head">
                      
                    </div> 
                </div>
              </div>
              <div class="col-md-4 px-4 profile_text">
                <div class="row py-2">
                  <label class="pr-2"><strong>First Name:</strong></label>
                   {props.first_name}
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>Last Name:</strong></label>
                  {props.last_name}
                </div>
                <div class="row py-2">
                  <label class="pr-2"><strong>E-mail:</strong></label>
                  {props.email}
                </div>
              
              </div>
            </div>
          </div>
          <div class="container mt-4 py-4">
            <p class="py-2 profile_text"><strong>About Me:</strong></p>
            {props.bio}
          </div>
          
          
        </div>
    );
  }
  render(){
    
    
    return(
      <Router>
         <Navbar bg="light" expand="ex-lg">
          <Navbar.Brand href="/main">Meetup</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ml-auto">

              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" href="./create_group">Create Group</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" onClick = {Logout}>Logout</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/*<GroupCard item = {"-LeAefNx9g_SchTVOyXk"} key = {"-LeAefNx9g_SchTVOyXk"}/> */}
      <header>
        <Button variant = {this.state.permissions ? "primary" : "outline-light"} disabled = {!this.state.permissions} onClick = {this.handleEditButton}> {this.state.editing ? 'Cancel Edit' : 'Edit' }</Button>
        {this.state.editing ?  
                              <this.handleEditRender  first_name = {this.state.first_name}
                                                      last_name = {this.state.last_name}
                                                      email = {this.state.email}
                                                      bio = {this.state.bio}
                                                      submit = {this.handleEditSubmit}
                                                      change = {this.handleChange}
                                                      uniqueLink = {this.state.uniqueLink}/>
                                                    :
                              <this.handleViewRender first_name = {this.state.first_name}
                                last_name = {this.state.last_name}
                                email = {this.state.email}
                                bio = {this.state.bio}
                                uniqueLink={this.state.uniqueLink}
                                  />}
        
      </header>
        
      
      <Row>
      <Col></Col>
      <Col xs = {8}>
      <Carousel style = {{"background-color" : "white"}}>
        
        {this.state.groups.slice(1,this.state.groups.length).map((item,key) =>
          
          <Carousel.Item>
          <GroupCard item={item} key={item.key}/>
          </Carousel.Item>
      )}
      </Carousel>
      </Col>
      <Col></Col>
      </Row>
      

      </Router>



    )
  }
}

/*function uploadImage() {

};*/

export default Profile