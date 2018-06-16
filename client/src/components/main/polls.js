import React from 'react';
import Poll from './poll.js';


class Polls extends React.Component {


  filter=(event)=>{
     this.props.filter(event.target.value,'latest');
    }  


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

      <div className='polls' >
      <div className="search">
        <h2>{this.props.currentList}</h2>
        <div>
        <label>search</label><input onChange={this.filter}/>
        </div>
        </div>
      <div className='pollsList'>
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

      </div>



    );

  }
}


export default Polls;