import React from 'react';


class Poll extends React.Component {

    showContext = (event) => {
        this.props.showContext(event);
    }
    showVote= (event)=>{
        this.props.vote(event,'enabled');
    }
    render() {
//  
       
        return (
            <div className="poll">
         
                <h3 className="pollSelection"
                
                onClick={this.showContext} 
                data-id={this.props.pollId}>
                {this.props.title}
                </h3>
            
                <h3 
                className="vote"
                onClick={this.showVote}
                data-id={this.props.pollId}>
                vote
                </h3>
                
            </div>


        );
    }

}

export default Poll;