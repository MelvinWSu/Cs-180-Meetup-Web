import React, {Component} from 'react'
import {BrowseRouter as Router, Route} from 'react'


export default class AppController extends Components{

    constructor(props){
        super(props);

        this.state = {

            //to keep track of login credentials and the proper page to load
            currentUser : null
        
        }

    }

    render(){
        
        return(

            <Router>
            <div>
                <Route exact path = "/"  component = {DisplayPage} />
                <Route exact path = "/CreateGroup" component = {CreateGroup} />
                <Route exact path = "/CreateEvent" component = {CreateEvent} />
                <Route exact path = "/Group" component = {Group} />
                <Route exact path = "/Homepage" component = {Homepage} />
                <Route exact path = "/Login" component = {Login} />
                <Route exact path = "/Mainpage" component = {Mainpage} />
                <Route exact path = "/Profile" component = {Profile} />
                <Route exact path = "/Signup" component = {Signup} />
                <Route exact path = "/LoginPage" component = {LoginPage} />
            </div>
            </Router>
        );

        
    }
}
