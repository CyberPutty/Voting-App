import React from 'react';
import Polls from '../components/main/polls.js';
import Profile from '../images/default-profile.svg';
import {Redirect} from 'react-router-dom';
class Users extends React.Component{




render(){

if(this.props.redirect==='/home'|| this.props.loggedIn==='false'){
    return <Redirect to={'/'}/>;
}

    return (

       
            <div className="middlesection">
          <div className="fullWidth">
            <h1>Welcome {this.props.username}!</h1>
            <div >
            
                {/* <Polls pollsList={this.props.pollsUser} currentList="Your Polls"/> */}
          
                <button onClick={this.props.showPollNew}>Create New Poll</button>
</div>
            
        
        </div>
        <div className="fullWidth profile">
        <img src={this.props.avatar} className="" width="250px" height="250px"/>
        <form method="post" action="/users/avatar">
            <input type="url" name="url" /><button type="submit" >Image Url</button>
            </form>
        </div>
        </div>
      
    );

}





}

export default Users;