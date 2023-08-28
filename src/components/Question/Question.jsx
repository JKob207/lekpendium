import React, { useState } from "react";
import "./Question.scss"

export default function Question({question, questionIndex})
{
    const [visible, setVisible] = useState(false)

    function toggleVisible()
    {
        setVisible(prev => !prev)
    }

    return (
        <div className="question-container">
            <div className={`cursor-pointer question ${visible ? "open" : "close" }`} onClick={toggleVisible}>
                <h3>{questionIndex}. {question.question}</h3>
                <span>
                    {
                        visible ?
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" style={{rotate: "-180deg"}} xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.03479 10.0173L12.0174 17.9999L20 10.0173" stroke="black" strokeLinecap="round"/>
                        </svg>
                        : 
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.03479 10.0173L12.0174 17.9999L20 10.0173" stroke="black" strokeLinecap="round"/>
                        </svg>
                    }
                </span>
            </div>
            <div className={`answers ${visible ? "" : "hidden" }`} >
            {
                question.answers.map((answer, index) => {
                    const numOfQuestions = ["A.", "B.", "C.", "D.", "E."]
                    return(
                        <div key={index} className={`answer cursor-pointer`}>
                            <p className={`${question.rightAnswer == index ? "goodAnswer" : ""}`}>{numOfQuestions[index]} {answer}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}