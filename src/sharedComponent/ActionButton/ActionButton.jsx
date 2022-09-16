import React from "react"; 
import './styles.scss'
const ActionButton = ({text, clickHandler, varient}) => {
    return (
        <button onClick={()=>clickHandler()} className={`actionButton actionButton__${varient}`} >{text}</button>
    )
} 

export default ActionButton;