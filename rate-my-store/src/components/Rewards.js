import React from 'react';


function newCodeStr() {

    let code = ['0','0','0','0','0'];  //5 digit random code to be converted to code string
    let newCode = code.map(  c => { return ( Math.floor(Math.random()*10) ) }  );
    return newCode.join('');
}


function fetchBarCode() {

    let code = newCodeStr();

    return (
        <div>
            <p>{code}</p>
            <img src={`https://quickchart.io/qr?text=${code}`} />
        </div>
    )
}

export default function Rewards(props) {
    
    let toContainerId="rewards-container";

    if (! props.location.checkRewardStatusCallback()) {
        return <div></div>
    }
    return (  //display already rendered in App.js
        <div id={toContainerId}>

            <p>{fetchBarCode()} </p>

        </div>
    )
}
