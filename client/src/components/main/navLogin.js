import React from 'react';
import {Redirect} from 'react-router-dom';

class NavLogin extends React.Component{





    render(){
        if(this.props.loggedIn===false){
return(
<div className="userlogin">
       <h2 id="login" onClick={this.props.handleLogin}>login</h2>
       <h2>/</h2>
       <h2 id="signup" onClick={this.props.handleSignup}>signup</h2>
       </div>
);

        }
        return(
                <div className="userLogin">
                    <h2>logged in as {this.props.username}</h2>
                  <h3 onClick={this.props.logout}>log out</h3>
                    <h3 onClick={this.props.redirectHome}>home</h3>
                </div>
        );

    }
   
   



}

export default NavLogin;