import React from "react";

interface Props {
    inverted?: boolean;
    content?: string;

}

export default function LoadingComponent({inverted = true, content = "Loading..."} : Props) {
    return (
        <div className="loader-parent">
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">{content}</div>
            </div>
        </div>
        
    )
}