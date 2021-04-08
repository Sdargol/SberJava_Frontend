import React from 'react';
import './cell-style.css';

let Cell = ({value, click}) => {
    const styleColor = value == "X" ? {color : "#a5ffa5"} : {color : "#ffb6ec"};
    
    return (
        <div onClick = {click}  
            style = {styleColor} 
            className = "cell">

            {value} 
        </div>
    )
}

export default Cell;