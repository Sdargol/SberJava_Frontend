import React from 'react';
import './button-style.css';

let Button = ({handleRestart, content}) => {
    return (
        <button onClick = {handleRestart} className = "btn">{content}</button>
    )
}

export default Button;