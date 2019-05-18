import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';


function forwardToProfile(email){

    var getUID = fire.database().ref("users");
       getUID.orderByChild('email').equalTo(email).on("value", function(snapshot) {
       snapshot.forEach(function(child) { 
        window.location.href = 'profile/user/' + child.key;

       })
       });
      
}

export default forwardToProfile
