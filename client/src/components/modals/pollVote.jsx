import React from 'react';

import ModalWrapper from './modalWrapper';

const PollVote = (props) => {
    const submitVote = () => {
        props.hideModal();

    }
if(props.loggedIn==false){
    return(<ModalWrapper  {...props} title={props.poll.title} showOk={false} width={400}>
        <h2>Please Log In To Vote</h2>
    </ModalWrapper>)
}
    return (
        
        <ModalWrapper {...props} title={props.poll.title} showOk={false} width={400}>
        
            <div className="">
                <form method="post" action="/posts/updateVotes">
                    <div className="centerVoteList">
                 
                            {props.poll.fields.map(function (d,index) {
                                return (<div className="radio"><p>{d}</p><input  type="radio" name="vote" value={index}/></div>);
                            })}
                       
                        <input name="id" type="hidden" value={props.poll._id}/>
                        <button type="submit" onClick={submitVote}>Submit Vote</button>
                    </div>
                </form>
            </div>
        </ModalWrapper>



    );







};

export default PollVote




