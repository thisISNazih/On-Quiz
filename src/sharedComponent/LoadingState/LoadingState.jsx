import React from "react" 
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import "./styles.scss"
const LoadingState = () => {
    return (
        <div className="loadingState-wrapper">
            <LoadingSpinner /> 
            <label>We are running to get your results!</label>
        </div>
    )
} 
export default LoadingState