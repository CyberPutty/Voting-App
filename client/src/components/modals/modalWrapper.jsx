import React from 'react';

// const {PropTypes}= React;


const ModalWrapper= props=>{

    // const backgroundClick=e=> {
    //     if (e.target !== e.currentTarget){
    //         props.hideModal();
    //     }
    // }

    // const onOk=()=>{
    //     props.onOk();
    //     // on OK will take params
    //     props.hideModal();
    // }

    // const showOkButton= props.showOk
    // ?(<button onClick={onOK} disabled={props.okDisabled}>
    //     {props.okText}   
    // </button>)
    // :null;


    return(
        <div className={props.size+ ' wrapper'} >
        <header>
        <h1>{props.title}</h1>
        <button onClick={props.hideModal}>Close</button>
        </header>

        {props.children}
        {/* {okButton} */}
        
        </div>




    );







};


export default ModalWrapper;

