import React from 'react';
import ModalWrapper from './modalWrapper.jsx';
import Piechart from '../main/piechart';



class Login extends React.Component{



    render(){

        return(
            <div >
          
            <ModalWrapper {...this.props} showOk={false} width={400}>
           
            <Piechart currentPoll={this.props.currentPoll}/>
      
           </ModalWrapper>
            
</div>
        );
    }
}

export default Login;