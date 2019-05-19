import React, {Component} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import img_placeholder from './pics/img_placeholder.png';
import group_placeholder from './pics/group_placeholder.png';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import fire from '../fire';

class dynamicfieldpractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI(){
     return this.state.values.map((el, i) => 
         /*<div key={i}>
    	    <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
    	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
         </div>         */
         <div key = {i}>
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
         </div>
     )
  }

  handleChange(i, event) {
     let values = [...this.state.values];
     values[i] = event.target.value;
     this.setState({ values });
  }
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
    var x = document.getElementById("showEventCreate");
    x.style.display = "none";
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.values.join(', '));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          {this.createUI()}        
          <input type='button' id= "showEventCreate" value='Show Create Event' onClick={this.addClick.bind(this)}/>
      </form>
    );
  }
}

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
  fire.database().ref("events").push(event_details);

  var event_num = fire.database().ref();
  event_num.once("value", function(snapshot) {
      fire.database().ref().update({event_num: snapshot.child("events").numChildren()});
    });
  alert("Event Creation Successful");
}

export default dynamicfieldpractice