import React from 'react';
import PollVote from './pollVote.jsx';
import Login from './login.js';
import PollNew from './pollNew.js';
import Signup from './signup.js';
const ModalConductor=(props)=>{

    switch(props.currentModal)
{
    case 'POLL_VOTE':
    return <PollVote poll={props.poll} hideModal={props.hideModal} loggedIn= {props.loggedIn}/>;
    case 'LOGIN':
     return <Login 
     hideModal={props.hideModal}  
     responseGoogle={props.loginGoogle}
     credentialFail={props.credentialFail}/>
    case "SIGNUP":
       return <Signup 
       hideModal={props.hideModal} 
       responseGoogle={props.signupGoogle}
       credentialFail={props.credentialFail}/> 
    case 'POLL_NEW':
    return <PollNew
    hideModal={props.hideModal}  
    resetForm={props.resetForm}
    addSelection={props.addSelection}
    removeSelection={props.removeSelection}
    entries={props.entries}/>
    default:
    return null;
}
}
export default ModalConductor; 