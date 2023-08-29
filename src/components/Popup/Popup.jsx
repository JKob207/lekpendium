import React from "react";
import "./Popup.scss";

export default function Popup({header, text, style})
{
    return (
        <div className={`popup-container fade-out ${style}`}>
            <h3 className={`popup-header`}>{header}</h3>
            <p className="popup-text">{text}</p>
        </div>
    )
}