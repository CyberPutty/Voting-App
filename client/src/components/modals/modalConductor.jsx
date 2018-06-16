import React from 'react';
import PollVote from './pollVote.jsx';
import Login from './login.js';
import PollNew from './pollNew.js';
import Signup from './signup.js';
import PieModal from './pieModal.js';
import ModalWrapper from './modalWrapper';
const ModalConductor=(props)=>{

    switch(props.currentModal)
{
    case 'POLL_VOTE':
    return <PollVote 
    size={'data'}
    poll={props.poll} 
    modalAlert={props.modalAlert}
    submitVote={props.submitVote}
    hideModal={props.hideModal} 
    loggedIn= {props.loggedIn}/>;
    case 'LOGIN':
     return <Login
     size={'login'} 
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
    size={'data'}
    newPoll={props.newPoll}
    hideModal={props.hideModal}  
    resetForm={props.resetForm}
    addSelection={props.addSelection}
    removeSelection={props.removeSelection}
    entries={props.entries}/>
    case "PIE":
    return<PieModal size={'data'} hideModal={props.hideModal} currentPoll={props.currentPoll}/>
    default:
    return <ModalWrapper size={'data'}/>;
}
}
export default ModalConductor; 