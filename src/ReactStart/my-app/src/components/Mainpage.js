import React, {Component} from 'react';
import './style.css';
import fire, {auth, provider} from '../fire';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem, Row, Col} from 'react-bootstrap';
import { Dropdown, DropdownButton} from 'react-bootstrap';
import Logout from './Logout';
import forwardToProfile from './forwardToProfile'
import GroupCard from './GroupCard'
import EventCard from './EventCard'
import logo from './pics/logo.png'

class Mainpage extends Component { 
  constructor(){
    super()
    this.state = {

      currentUser: false,
      loggedOn : false,
      currentemail: false,

      searching : false,
      search_option : "Group",
      search_results : {},

      results_option : "Group"
      }

    this.handleSearch = this.handleSearch.bind(this)
  
  } 

  handleProfileButtonClick() {
    
    if (auth.currentUser){
      
      //get key of current user
      //forward to that profile
      forwardToProfile(auth.currentUser.email);
    }
    else{
      alert("Not Logged On")
      window.location.href = "/"
    }
 }


  componentDidMount(){

    auth.onAuthStateChanged((user) => {
        
      if (user) {

        this.setState({ currentUser:user,
                        loggedOn : true});
        
        console.log("mounted state")
        console.log(this.state)
      }
      else{

        console.log("no one logged on")
      }
    });

    console.log("states: ")
    console.log(this.state)

  }

  async handleSearch(){

    //Group Results {item = Group Unique Key}
    //Event Results uses have {index = EventUniqueKey, content = {} }

    console.log("Searching...")
    console.log(this.state.search_option)
    this.setState({searching : true, search_results : {}})
    
    var query = document.getElementById("searched_text").value;
    var query_list = query.split(" ")
    var results_list = {}
    console.log("query list")
    console.log(query_list)


    if (this.state.search_option == "Group"){
      
      //get dictionary of groups
      /*
        iterate through dictionary
          check the if the word is in the title or bio
      */
     
     var searchRef = fire.database().ref("groups/");
     await searchRef.once("value").then(function(snapshot) {
        var ref_list = snapshot.val();
        console.log("ref_list")
        console.log(ref_list)
        for(var key in ref_list){
          for(var index in ref_list[key]){
          
            var indexType = typeof(ref_list[key][index])
            var data = ref_list[key][index]
            
            if(indexType == "string"){
                var data_list = data.split(" ")
                console.log("data:")
                console.log(data_list)

                for( var i =0;i<query_list.length; i++){
                  for (var j =0; j<data_list.length; j++){
                    if(data_list[j].toLowerCase() == query_list[i].toLowerCase()){
                      results_list[key] = "0"
                    }
                  }
                }
            }

          }
        }
      
      });

      this.setState({ results_option : "Group",
                      search_results : results_list})
      console.log("result:")
      console.log(results_list)
      return
    }
    else if (this.state.search_option == "Event"){
      
      var searchRef = fire.database().ref("groups/");
      await searchRef.once("value").then(function(snapshot) {
        var ref_list = snapshot.val();
        console.log("ref_list")
        console.log(ref_list)
        for(var key in ref_list){
          for(var index in ref_list[key]){
            
            if (index == "event_list"){
              var data = ref_list[key][index]
              
              console.log("data: ")
              console.log(data)
              
              //go through each event in event_list
              for (var eachEventKey in data){
                
                console.log("eachEventKey:")
                console.log(eachEventKey)
                var eventData = data[eachEventKey]
                console.log("event data:")
                
                for(var eachKey in eventData){
                  if (typeof(eventData[eachKey]) == "string"){
                    var data_list = eventData[eachKey].split(" ")
                    
                    console.log('individual event data in list form: ')
                    console.log(data_list)
                    //compare the query to the data in the event
                    for( var i =0;i<query_list.length; i++){
                      for (var j =0; j<data_list.length; j++){
                        if(data_list[j].toLowerCase() == query_list[i].toLowerCase()){
                          results_list[eachEventKey] = eventData
                        }
                      }
                    }
                  }
                }
                
                

              }

             
                
              
            }

          }
        }
      
      });
      this.setState({search_results : results_list, results_option : "Event"})
      console.log("result:")
      console.log(results_list)
      return

    }
      
  }

  handleSearchOptionGroup = () => {
    this.setState({search_option : "Group"})
  }
  handleSearchOptionEvent = () => {
    this.setState({search_option : "Event"})
  }

  render(){
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
                <Nav.Link href="./account">Account</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                  <Nav.Link onClick = {this.handleProfileButtonClick}>Profile</Nav.Link>
                </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" href="./createGroup" >Create Group</Nav.Link>
              </NavItem>
              <NavItem className="ml-auto">
                <Nav.Link className="ml-auto" onClick = {Logout}>Logout</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <main className="new_font">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4 text-center text-light">Find your group or event</h1>
              <p className="lead text-center text-light">Search for your group or event and look to join a new group or reserve an event.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="w-100">
                <form>
                  <div className="input-group">
                      <DropdownButton className="btn btn-primary search_buttons" id="search_type" title= {this.state.search_option}>
                      <Dropdown.Item onClick = {this.handleSearchOptionGroup}>Group</Dropdown.Item>
                      <Dropdown.Item onClick = {this.handleSearchOptionEvent}> Event</Dropdown.Item>
                    </DropdownButton>
                    <input id="searched_text" className="form-control main_search" type="text" placeholder="Enter group or event" name="searched_item"/>
                    <button onClick = {this.handleSearch} className="btn btn-primary search_buttons px-5" type="button">Search</button> 
                  </div>
                </form>
              </div>
            </div>

            {console.log("Results_list")}
            {console.log(this.state.search_results)}
            <Col></Col>
            <Col>
            {Object.keys(this.state.search_results).slice(0,this.state.search_results.length).map((Key,item) => 

                    <div>
                    <Row>
                    { this.state.results_option == "Group" ? <GroupCard item = {Key} /> :
                                                      <EventCard index = {Key} content = {this.state.search_results[Key]} searchMode = {true} /> }
                    </Row>
                    <br></br>
                    <br/>
                    <br></br>
                    </div>
                  )} 
           </Col>
           <Col></Col>
            
          </div>
        </main>
      </header>
      
    );
  }
}

export default Mainpage;