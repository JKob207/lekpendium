import React, { useContext, useEffect, useState } from "react";
import "./Question.scss"
import { Link } from "react-router-dom";
import { userContext } from "../AuthRequired/AuthRequired";
import { updateUser } from "../../services/api";

export default function Question({question, questionIndex, type, setAnswers, answerResults})
{
    const [visible, setVisible] = useState(false)
    const [clickedAnswer, setClickedAnswer] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const user = useContext(userContext)

    useEffect(() => {
        type === "quiz" ? setVisible(true) : setVisible(false)
        if(user.favourite.find(el => el.id === question.id))
        {
            setFavourite(true)
        }
    }, [])

    function toggleVisible()
    {
        if(type === "overview" || type === "users") setVisible(prev => !prev)
    }

    async function toggleFavourite()
    {
        setFavourite(prev => !prev)
        if(favourite)
        {
            console.log("Delete from favourite!")
            const tmpFavourite = user.favourite
            const idToDelete = tmpFavourite.findIndex(el => el.id === question.id)
            tmpFavourite.splice(idToDelete, 1)
            const newUserData = {
                ...user,
                favourite: tmpFavourite
            }

            try {
                await updateUser(user.id, newUserData)
            } catch (error) {
                console.log(error)
            }
            
        }else
        {
            const newUserData = {
                ...user,
                favourite: [...user.favourite, question]
            }

            try {
                await updateUser(user.id, newUserData)
            } catch (error) {
                console.log(error)
            }
        }
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
                    (type === "overview" || type === "users") &&
                    <span className="p-2 cursor-pointer" onClick={toggleFavourite}>
                        {
                            favourite ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        }
                    </span>
                }
                {
                    type === "users" &&
                    <Link to="edit" className="p-2 cursor-pointer" state={question}>
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