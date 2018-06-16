import React from 'react';

import Polls from '../components/main/polls.js';
import Piechart from '../components/main/piechart.js';
import {Redirect} from 'react-router-dom';

class Home extends React.Component{

componentDidMount(){
  this.props.getLatestPolls();
}
showContext=(event)=>{
this.props.showContext(event);
}
showVote=(event,id)=>{
this.props.vote(event,id);
}
render(){
    if (this.props.redirect==='/users'){
      return(<Redirect to={this.props.redirect}/>)
  
    };

    return(

<div className= "middlesection">
<Polls
filter={this.props.filter} 
showContext={this.showContext} 
vote={this.showVote} 
pollsList= {this.props.pollsLatest} 
currentList="Latest Polls"/>
<Piechart currentPoll={this.props.currentPoll}/>

</div>

);

}    

}

export default Home;
