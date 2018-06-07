import React, { Component } from 'react';

import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import './App.css';
import Home from './routes/home.js';
import NavLogin from './components/main/navLogin.js';
import Users from './routes/users.js';
import ModalConductor from './components/modals/modalConductor';
import Piechart from './components/main/piechart';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollsUser: [],
      pollsLatest: [],
      showForm: "hide",
      userEntries: [],
      redirect: "/home",
      loggedIn: false,
      avatar: null,
      username: null,
      currentModal: null,
      voteForm: "hide",
      currentPoll: {"votes": [1], "fields": ["none"]},
      credentialFail: ''

    }
  }



  // polls and pie chart


  componentDidMount() {

    fetch('/posts').then(resp => resp.json()).then(data => {
      console.log(data);
      this.setState({
        pollsLatest: data
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
    this.setState({
      username: null,
      loggedIn: false,
      userEntries:[],
      avatar: null
    });
  }
  loginGoogle=(response)=>{
    console.log(response);
    if(response){
      fetch('/users/login?user='+response.googleId,{
        method: 'GET',
        credentials: 'same-origin'
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        if(data.name){
          this.setState({
            username: data.name,
            userEntries: data.userPolls,
            avatar: data.avatar,
            loggedIn: true,
            redirect: '/users'
          });
          this.hideModal();
        }
        else{
          this.setState({
            credentialFail: data.found
          });
        }
      });
      // send data to database determine if match then respond with either err to signup or account log in.
  }
  }
  signupGoogle=(response)=>{
    console.log(response.profileObj);
    if (response){
      fetch('/users/signup',{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(response.profileObj)
      }).then(res=>res.json()).then(data=>{
          console.log(data);
        if(data.name){
          this.setState({
          username: data.name,
          userEntries: data.userPolls,
          avatar: data.avatar,
          loggedIn: true,
          redirect: '/users'
        });
        
        this.hideModal();
        }
        else{
          this.setState({
            credentialFail: data.found
          });
        }
        
      }).then(()=>{this.setState({redirect: false})})
      // send data to database create account if email not taken. or google id?

    }
  }

  authTime=(logTime)=>{

    if (new Date().getTime<logTime){
      this.state.loggedIn='true';
      
    }
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
      this.setState({ voteForm: "hide"});
    }  

   }

redirectHome=()=>{
  this.setState({redirect: '/home'});  
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
  showPie = (event,id) => {
  
    const ID = event.target.dataset.id;
  
   
    const currentPoll = this.state.pollsLatest.filter(function (item) {
      if (item._id == ID) {
        return item;
      }
    });
    if(this.state.currentPoll._id!== currentPoll[0]._id ){
      this.setState({currentPoll: currentPoll[0]});
      
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
            redirect= {this.state.redirect}
            showContext={this.showPie} 
            currentPoll={this.state.currentPoll} 
            pollsLatest={this.state.pollsLatest} 
            vote={this.showVote}/>
            </div>} />
            <Route exact path="/users" render={() => 
            <div>
              <Users
              redirect= {this.state.redirect}
              username= {this.state.username}
              avatar= {this.state.avatar}
              showPollNew= {this.showPollNew}
              pollsUser={this.state.pollsUser} />
              </div>} />
          </Switch>
        </BrowserRouter>
        <div className={'hideForm ' + this.state.voteForm}>
           <ModalConductor
           loggedIn={this.state.loggedIn}
           credentialFail={this.state.credentialFail}
           loginGoogle={this.loginGoogle}
           signupGoogle={this.signupGoogle}
           currentModal={this.state.currentModal} 
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
