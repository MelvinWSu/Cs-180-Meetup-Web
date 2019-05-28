import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';
import {Card, Button, Nav, Row, Col, Container, Modal} from 'react-bootstrap'
import './style.css';


export default class EventCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            item: this.props.item,
            key: this.props.key,
            joined: false
        }

        console.log("start states")
        console.log(this.state)

        //this.handleClick = this.handleClick.bind(this)
    }

    /*buttonClicked(event) {
        var self = this;
        if (self.state.joined != true) {
            alert("Joined Event");
            self.state.joined = true;
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    var userkey = '';
                    var ref = fire.database().ref("users");
                    ref.orderByChild("email").equalTo(user.email).on("value", function (snapshot) {
                        snapshot.forEach(function (data) {
                            console.log(data.key);
                            userkey = data.key;
                        })
                    })
                    fire.database().ref("groups/" + window.location.pathname.split('/group/')[1] + "/event_list").push([userkey])
                    console.log("1");
                }
            });
        }
        else {
            alert("Already in Event");
            console.log("0");
        }
    }*/

    componentDidMount() {
        var self = this;
        console.log("Current States:")
        console.log(self.state)
        var usersRef = fire.database().ref("groups/" + this.state.item + "/event_list/" + this.state.item);
            usersRef.once("value").then(function(snapshot) {
            self.setState({
                eventName: snapshot.val().event_name,
                eventTime: snapshot.val().time,
                eventBio: snapshot.val().desc,
                eventLoc: snapshot.val().loc
            })   
        });
    }

    /*handleClick(){
        // NEEDS TO BE UPDATED
        window.location.href = '/groups/' + this.state.item
    }*/
    
    render(){
        return(
            <div class="card group_card">
                <div class="card-body">
                    <h5 class="card-title">{this.state.eventName}</h5>
                    <div class="card-text">
                        <p>{this.state.eventBio}</p>
                    </div>
                    <div class="card-bottom">
                        <img src="#" alt="profile_img" />
                        <form>
                            <div class="text-right">
                                <input id="join_event" class="btn btn-info" type="button" /*onClick={this.buttonClicked.bind(this)}*/>Join Event</input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}