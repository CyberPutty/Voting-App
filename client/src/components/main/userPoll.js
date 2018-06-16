import React from 'react';


class Poll extends React.Component {

  
    showPie=(event)=>{
        this.props.showPie(event,true);
    }
    deletePoll=(event)=>{
        this.props.deletePoll(event);
    }
    render() {
//  
       
        return (
            <div className="poll">
         
                <h3 className="pollSelection"
                
                onClick={this.showPie}
                data-id={this.props.pollId}>
                {this.props.title}
                </h3>
            
                <h3 
                className="vote"
                data-id={this.props.pollId}
                onClick={this.deletePoll}
                >
                
                Delete
                </h3>
                
            </div>


        );
    }

}

export default Poll;