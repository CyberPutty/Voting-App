import React from 'react';
import ModalWrapper from './modalWrapper.jsx';
import { StaticRouter ,BrowserRouter, Route, Link,Redirect } from "react-router-dom";



class Login extends React.Component{

responseGoogle = () => {
   
    return(<Redirect to={'/auth/google'}>Login</Redirect>);
      }

    render(){

        return(
            <div >
          
            <ModalWrapper {...this.props} showOk={false} width={400}>
           
<a href={'http://localhost:3001/auth/google'}>login</a>

             <p>{this.props.credentialFail}</p>
           </ModalWrapper>
            
</div>
        );
    }
}

export default Login;