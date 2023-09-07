import React, { useEffect, useState } from "react";
import "./Question.scss"
import { Link } from "react-router-dom";

export default function Question({question, questionIndex, type, setAnswers, answerResults})
{
    const [visible, setVisible] = useState(false)
    const [clickedAnswer, setClickedAnswer] = useState(null)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        type === "quiz" ? setVisible(true) : setVisible(false)
    }, [])

    function toggleVisible()
    {
        if(type === "overview" || type === "users") setVisible(prev => !prev)
    }

    function checkAnswer(index)
    {
        if(!answerResults.hasOwnProperty(questionIndex))
        {
            if(question.rightAnswer.toString() === index.toString())
            {
                setAnswers(questionIndex, true)
            }else
            {
                setAnswers(questionIndex, false)
            }

            setDisabled(true)
            setClickedAnswer(index)
        }
    }

    return (
        <div className="question-container">
            <div className={`question ${visible ? "open" : "close" }`}>
                <h3>{questionIndex}. {question.question}</h3>
                <div className="icons flex items-center">
                {
                    (type === "overview" || type === "users") &&
                    <span className="p-2 cursor-pointer" onClick={toggleVisible}>
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
                }
                {
                    type === "users" &&
                    <Link to="edit" className="cursor-pointer" state={question}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Link>
                }
                </div>
            </div>
            <div className={`answers ${visible ? "" : "hidden" }`} >
            {
                question.answers.map((answer, index) => {
                    const numOfQuestions = ["A.", "B.", "C.", "D.", "E."]
                    return(
                        <div key={index} className={`answer ${answerResults.hasOwnProperty(questionIndex) ? "disabled" : ""}`} onClick={() => checkAnswer(index)}>
                            <p className={`${(question.rightAnswer == index & type !== "quiz" ) ? "goodAnswer" : ""} ${
                                answerResults.hasOwnProperty(questionIndex) & clickedAnswer === index ? (answerResults[questionIndex] ? "goodAnswer" : "badAnswer") : ""
                            }`}>{numOfQuestions[index]} {answer}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}