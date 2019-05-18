import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';


function Logout(){

    if(fire.auth().currentUser == null){

        console.log(window.location.href)
        alert("No User is logged in")
        if (window.location.href != "http://localhost:3000/signup"){
            window.location.href = "/"
        }

    }
    else{
        fire.auth().signOut().then(function() {
            // Sign-out successful.
            alert("Logging out")
            console.log("logging out...")
            console.log("Current User:")
            console.log(fire.auth().currentUser)
            window.location.href = '/'
        }, function(error) {
            console.log("ERROR")
            // An error happened.
        });
    
        
    }
      
}

export default Logout