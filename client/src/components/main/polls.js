import React from 'react';
import Poll from './poll.js';


class Polls extends React.Component {





  render() {
    const handleShowContext = (event) => {
      this.props.showContext(event);
    }
    let ref_id;
    const handleVote= (event,id)=>{
      this.props.vote(event,ref_id);
    }
    const loggedIn= this.props.loggedIn;
    return (

      <div className='polls'>
        <h1>{this.props.currentList}</h1>
        {this.props.pollsList.map(function (item) {
          ref_id= item._id;
          return <Poll 
          loggedIn={loggedIn}
          pollId={item._id} 
          title={item.title} 
          showContext={handleShowContext} 
          fields={item.fields} 
          createdBy={item.created_By} 
          startDate={item.date_created}
          vote={handleVote} />
        })}



      </div>



    );

  }
}


export default Polls;