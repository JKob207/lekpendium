import React, { useState } from "react";
import "./QuizSummary.scss";
import { Link, useLocation, useParams } from "react-router-dom";

export default function QuizSummary()
{
    const location = useLocation()
    const params = useParams()
    const resultElements = []

    for (const property in location.state.results) {
        resultElements.push(
            <div key={property} className={`${location.state.results[property] ? "successAnswer" : "wrongAnswer"} result`}>
                <p>{property}</p>
                <p>{location.state.results[property] ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                }</p>
            </div>
            
        )
    }

    return (
        <div>
            <h1 className="summary-title">Podsumowanie Quizu: {params.name}</h1>
            <div className="results-container">
                {resultElements}
            </div>
            <div className="button">
                <Link to="/main" className="primary-button">
                    Powrót do strony głównej
                </Link>
            </div>
        </div>
    )
}