import React from 'react';
import UserPolls from '../components/main/userPolls.js';
import Profile from '../images/default-profile.svg';
import {Redirect} from 'react-router-dom';
class Users extends React.Component{

componentDidMount(){
 this.props.getUserPolls();

}
    showPie=(event,isModal)=>{
        this.props.showPie(event,isModal);
        }

render(){

if(this.props.redirect==="/"||this.props.loggedIn===false){
    console.log(this.props.loggedIn);
    return <Redirect to={'/'}/>;
}

    return (

       
            <div className="middlesection">
          <div className="fullWidth">
            <h1>Welcome {this.props.username}!</h1>
            <div>
            
                 <UserPolls
                 deletePoll={this.props.deletePoll} 
                 filter={this.props.filter}
                 showPie={this.showPie} 
                 pollsList={this.props.pollsUser} 
                 showPollNew={this.props.showPollNew} 
                 currentList="Your Polls"/> 
          
             
</div>
               <button 
               className='newPoll' 
               onClick={this.props.showPollNew}>
               Create New Poll
               </button>
        
        </div>
        <div className="fullWidth profile">
        <img src={this.props.avatar} className="" width="250px" height="250px"/>
        {/* <form method="post" action="/users/avatar">
            <input type="url" name="url" /><button type="submit" >Image Url</button>
            </form> */}
        </div>
        </div>
      
    );

}





}

export default Users;