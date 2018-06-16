import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './routes/home.js';
import NavLogin from './components/main/navLogin.js';
import Users from './routes/users.js';
import ModalConductor from './components/modals/modalConductor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollsUser: [],
      pollsLatest: [],
      pollsFiltered: [],
      showForm: "hide",
      userEntries: [],
      redirect: "/",
      loggedIn: false,
      avatar: null,
      username: null,
      currentModal: null,
      voteForm: "hide",
      currentPoll: {"votes": [1], "fields": ["none"]},
      modalAlert: ''
    }
  }



  // polls and pie chart
  componentDidMount() {
   console.log(this.state.loggedIn);

 fetch('/profile', { credentials : 'same-origin' 
 }).then(resp => resp.json()).then(data => {
      
      if(data.failed){
        console.log('not logged in');
      }
        else if(data.name){
 this.setState({
      loggedIn: true,
      avatar: data.avatar,
      username: data.name
 });
        }
       
   
 });
  }
 getLatestPolls=()=>{
  fetch('/posts',{credentials : 'same-origin'} ).then(resp => resp.json()).then(data => {
    console.log(data);
    this.setState({
      pollsFiltered: data.reverse(),
      pollsLatest: data.reverse()
      
    });

  });
 }
getUserPolls=()=>{
  fetch('/users/posts',{credentials : 'same-origin'}).then(resp => resp.json()).then(data => {
    console.log(data);
    this.setState({
      pollsFiltered: data.reverse(),
      pollsUser: data.reverse()
      
    });

  });

}
  signup = () => {
    this.setState({currentModal: "SIGNUP",credentialFail:''});
    this.hideModal();
  }
  login = () => {
  this.setState({currentModal: "LOGIN",credentialFail:''});
  this.hideModal();
  }
  logout=()=>{

    fetch('/auth/logout',{credentials : 'same-origin'}).then(()=>{
       this.setState({
      username: null,
      loggedIn: false,
      userEntries:[],
      avatar: null
    });
    });
   
  }
  loginGoogle=(event)=>{
console.log('hi');
      // send data to database determine if match then respond with either err to signup or account log in.
  
  }
  signupGoogle=(response)=>{
    
  }

  addSelection = (event) => {
    event.preventDefault();
    const entries = this.state.userEntries;
    entries.push(entries.length);
    console.log(entries);
    this.setState({
      userEntries: entries
    });
  }
  removeSelection = (event) => {
    event.preventDefault();
    const entries = this.state.userEntries;
    entries.pop();
    this.setState({
      userEntries: entries
    });
  }
  resetForm = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      userEntries: []
    });
  }
   hideModal = (event) => {
  
    if (this.state.voteForm == "hide") {
      this.setState({ voteForm: "showForm"});
    }
    else {
      this.setState({ voteForm: "hide",currentModal: "", modalAlert: ''});
    }  

   }

redirectHome=()=>{
  this.setState({redirect: '/'});  
}
redirectProfile=()=>{
  this.setState({redirect: '/users'});  
}

submitVote=(body)=>{
fetch('/posts/updateVotes',{
  credentials : 'same-origin',
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(body)
}).then((res)=>res.json()).then((data)=>{

  if(data.failureMessage){
 
     this.setState({modalAlert: data.failureMessage});
     
  }
  else{
    console.log(data,'databackfrom voting');
  this.setState({
    currentPoll: data
  });
  // could update the result client side without making another request to getLatestPolls
  this.getLatestPolls();
  this.hideModal();
  }
  
});
}

newPoll=(body)=>{
  fetch('/users/posts/new',{
    credentials : 'same-origin',
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then(resp=> resp.json())
  .then(data=>{
    console.log(data);
    this.resetForm;
    this.hideModal();
    this.getUserPolls();
  });
}
  showVote=(event)=>{
    this.showPie(event); 
    
     this.setState({
      currentModal: "POLL_VOTE"
    });
     this.hideModal();
  }
  showPollNew= ()=>{
    this.setState({
      currentModal: "POLL_NEW"
    })
    this.hideModal();
  }  
  showPie = (event,isModal) => {
  
    const ID = event.target.dataset.id;
  
   
    let currentPoll;
    if(isModal){
      currentPoll = this.state.pollsUser.filter(function (item) {
        if (item._id == ID) {
          return item;
  
  
        }
      });
    this.setState({currentModal: "PIE"});
    this.hideModal();
  }
else{
  
    currentPoll = this.state.pollsLatest.filter(function (item) {
      if (item._id == ID) {
        return item;
      }

      });
}

    if(this.state.currentPoll._id!== currentPoll[0]._id ){
      this.setState({currentPoll: currentPoll[0]});
      
    }

  }
  deletePoll=(event)=>{
    
    const ID=event.target.dataset.id;
    console.log(event,ID)
    fetch('/users/posts/delete',{
      credentials : 'same-origin',
      method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({id:ID})
    }).then(resp=> resp.json()).then(data=>{
      console.log(data);
      if(data.success){
         const newList= this.state.pollsUser.filter(function(item){
        return item._id!== ID;
      });
      this.setState({
        pollsUser: newList,
        pollsFiltered: newList
      });
   
      }
      });
  }
  filter=(query,list)=>{
    if(list==='latest'){
      this.setState({
     pollsFiltered: this.state.pollsLatest.filter(function(item){
      
      return item.title.toLowerCase().indexOf(query.toLowerCase()) > -1
     })
   });  
    }
    else if(list==='user'){
      this.setState({
        pollsFiltered: this.state.pollsUser.filter(function(item){
         
         return item.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      });  
    }    

  }

  render() {
    return (

      <div className="App">
        <div className="nav">
       <h1 className="title">Voting App</h1>
       <NavLogin 
       loggedIn= {this.state.loggedIn}
       logout= {this.logout}
       redirectHome= {this.redirectHome}
       redirectProfile={this.redirectProfile}
       username={this.state.username}
       handleLogin={this.login} 
       handleSignup={this.signup} 
       loginGoogle={this.loginGoogle} 
       signupGoogle= {this.signupGoogle} />
      </div> 


        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => 
            <div>
              <Home
            filter={this.filter}
            getLatestPolls={this.getLatestPolls} 
            redirect= {this.state.redirect}
            showContext={this.showPie} 
            currentPoll={this.state.currentPoll} 
            pollsLatest={this.state.pollsFiltered} 
            vote={this.showVote}/>
            </div>} />
            <Route exact path="/users" render={() => 
            <div>
              <Users
              deletePoll={this.deletePoll}
              filter={this.filter}
              getUserPolls={this.getUserPolls}
              redirect= {this.state.redirect}
              username= {this.state.username}
              avatar= {this.state.avatar}
              showPollNew= {this.showPollNew}
              pollsUser={this.state.pollsFiltered}
              loggedIn= {this.state.loggedIn}
              showPie= {this.showPie} />
              </div>} />
          </Switch>
        </BrowserRouter>
        <div className={'hideForm ' + this.state.voteForm}>
           <ModalConductor
           newPoll= {this.newPoll}
           modalAlert= {this.state.modalAlert}
           submitVote={this.submitVote}
           loggedIn={this.state.loggedIn}
           credentialFail={this.state.credentialFail}
           loginGoogle={this.loginGoogle}
           signupGoogle={this.signupGoogle}
           currentModal={this.state.currentModal}
           currentPoll={this.state.currentPoll} 
           hideModal={this.hideModal} 
           poll={this.state.currentPoll}
           resetForm={this.resetForm}
           addSelection={this.addSelection}
           removeSelection={this.removeSelection}
           entries={this.state.userEntries} />
        </div>
      </div>
    );



  }
}

export default App;
