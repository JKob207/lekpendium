import React, { useEffect, useState } from "react";
import "./Question.scss"

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
        if(type === "overview") setVisible(prev => !prev)
    }

    function checkAnswer(index)
    {
        if(!answerResults.hasOwnProperty(questionIndex))
        {
            console.log("Click!")

            if(question.rightAnswer.toString() === index.toString())
            {
                setAnswers(questionIndex, true)
                setDisabled(true)
            }else
            {
                setAnswers(questionIndex, false)
                setDisabled(true)
            }

            setClickedAnswer(index)
        }
    }

    return (
        <div className="question-container">
            <div className={`question ${visible ? "open" : "close" }`} onClick={toggleVisible}>
                <h3>{questionIndex}. {question.question}</h3>
                {
                    type === "overview" &&
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
                }
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