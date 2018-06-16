import React from 'react';

import ModalWrapper from './modalWrapper';

const PollVote = (props) => {


    // const submitVote = (event) => {
    //     console.log(event);
    //     props.hideModal();

    // }
    console.log(props.modalAlert);
    const handleSubmit= (event)=>{
   
        const body={
            vote: event.target.vote.value,
            id: event.target.id.value,
        }
       props.submitVote(body);
        console.log(body);
        event.preventDefault();
        // fetch('/post/updateVotes',)
       
    }
if(props.loggedIn==false){
    return(<ModalWrapper  {...props} title={props.poll.title} showOk={false} width={400}>
        <h2>Please Log In To Vote</h2>
    </ModalWrapper>)
}
    return (
        
        <ModalWrapper {...props} title={props.poll.title} showOk={false} width={400}>
        
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="centerVoteList">
                 
                            {props.poll.fields.map(function (d,index) {
                        

                                return (<div className="radio"><p>{d}</p><input  type="radio" name="vote" value={index}/></div>);
                            })}
                       
                        <input name="id" type="hidden" value={props.poll._id}/>
                        <button type="submit">Submit Vote</button>
                    </div>
                </form>
                <h2>{props.modalAlert}</h2>
            </div>
        </ModalWrapper>



    );







};

export default PollVote




