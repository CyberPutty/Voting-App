import React from 'react';
import Poll from './userPoll.js';


class Polls extends React.Component {


  filter=(event)=>{
     this.props.filter(event.target.value,'user');
    }  



  render() {
    const handleShowContext = (event) => {
      this.props.showContext(event);
    }
    let ref_id;
  
    const showPie=(event,isModal)=>{
      this.props.showPie(event,isModal);
    }
   const deletePoll=(event)=>{
     this.props.deletePoll(event);
   }
    const loggedIn= this.props.loggedIn;
    return (
/// 
      <div className='polls' >
      <div className="search">
        <h2>{this.props.currentList}</h2>
        <div>
        <label>search</label><input onChange={this.filter}/>
        </div>
        </div>
        {this.props.pollsList.map(function (item) {
          ref_id= item._id;
          return <Poll
          deletePoll={deletePoll} 
          loggedIn={loggedIn}
          pollId={item._id} 
          title={item.title} 
          showContext={handleShowContext} 
          fields={item.fields} 
          createdBy={item.created_By} 
          startDate={item.date_created}
          showPie={showPie}
           />
        })}
     


      </div>



    );

  }
}


export default Polls;