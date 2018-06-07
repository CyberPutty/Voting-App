import React from 'react';
import ModalWrapper from './modalWrapper.jsx';
import GoogleLogin from 'react-google-login';



class Signup extends React.Component{



responseGoogle = (response) => {
       this.props.responseGoogle(response);
      }

    render(){

        return(
            <div >
            <ModalWrapper {...this.props} showOk={false} width={400}>
            <GoogleLogin
    clientId="361440010790-rf4b3q3nc0hn8pgps5s8sa2dpnf9k9gd.apps.googleusercontent.com"
    buttonText="Signup with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  />
  <p>{this.props.credentialFail}</p>
        </ModalWrapper>
            
</div>
        );
    }
}

export default Signup;