import React from 'react';
import Entry from './entry.js';
import ModalWrapper from './modalWrapper.jsx';

class PollNew extends React.Component{
    componentDidMount(){
        this.props.resetForm();
    }

render(){


    return(
        <div className="">
        
<ModalWrapper {...this.props} showOk={false} width={400}>
<form  method="post" action="/users/posts/new">
           <div><label>Title: </label><input name="title"/></div>
            {this.props.entries.map(function(entry,index){
                
                return <Entry index={index}  />;
            })}
            <button onClick={this.props.removeSelection}>remove</button>
            <button onClick={this.props.addSelection}>new option</button>
            <button type="submit">create Poll</button>
        </form>
</ModalWrapper>
        </div>


    );
}



}
export default PollNew;