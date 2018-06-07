import React from 'react';


const Entry=(props)=>{
    return <div> 
        <label>{"option "+(props.index+1)}</label>
        <input type="text" name="field"/>
        </div>
        }


export default Entry;