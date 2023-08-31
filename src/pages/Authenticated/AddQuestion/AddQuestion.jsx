import React, { useContext, useState } from "react";
import "./AddQuestion.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../../components/AuthRequired/AuthRequired";
import { addQuestion } from "../../../services/api";

export default function AddQuestion()
{
    const params = useParams()
    const navigate = useNavigate()
    const userID = useContext(userContext).id

    const [formData, setFormData] = useState({
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        answerE: "",
        correctAnswer: 0
    })

    const [errors, setErrors] = useState({
        questionError: "",
        answerAError: "",
        answerBError: "",
        answerCError: "",
        answerDError: "",
        answerEError: "",
    })

    function handleChange(event)
    {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleSubmit(event)
    {
        event.preventDefault()
        //console.log(formData)

        setErrors({
            questionError: "",
            answerAError: "",
            answerBError: "",
            answerCError: "",
            answerDError: "",
            answerEError: "",
        })

        if(!formData.question || !formData.answerA || !formData.answerB || !formData.answerC || !formData.answerD || !formData.answerE)
        {
            if(!formData.question) setErrors((prevErrors) => ({
                ...prevErrors,
                questionError: "Brakujące pole!"
            }))

            if(!formData.answerA) setErrors((prevErrors) => ({
                ...prevErrors,
                answerAError: "Brakujące pole!"
            }))

            if(!formData.answerB) setErrors((prevErrors) => ({
                ...prevErrors,
                answerBError: "Brakujące pole!"
            }))

            if(!formData.answerC) setErrors((prevErrors) => ({
                ...prevErrors,
                answerCError: "Brakujące pole!"
            }))

            if(!formData.answerD) setErrors((prevErrors) => ({
                ...prevErrors,
                answerDError: "Brakujące pole!"
            }))

            if(!formData.answerE) setErrors((prevErrors) => ({
                ...prevErrors,
                answerEError: "Brakujące pole!"
            }))

            return
        }

        const questionData = {
            question: formData.question,
            answers: [formData.answerA, formData.answerB, formData.answerC, formData.answerD, formData.answerE],
            rightAnswer: formData.correctAnswer,
            questionOwner: userID
        }

        try {
            const result = await addQuestion(questionData, params.name)
            setFormData({
                question: "",
                answerA: "",
                answerB: "",
                answerC: "",
                answerD: "",
                answerE: "",
                correctAnswer: 0
            })
        } catch (error) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <div className="category-title">
                <h1 className="text-center text-white font-semibold text-2xl md:text-5xl capitalize">
                    {params.name}
                </h1>
            </div>
            <div className="add-question-form-container">
                <form>
                    <div className="question-textarena block text-sm font-light leading-6 text-dark">
                        <label htmlFor="question">Treść pytania: { <span className="error text-red-600 font-semibold">{errors.questionError}</span> }</label>
                        <textarea 
                            id="question" 
                            className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.questionError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            value={formData.question} 
                            name="question"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="answers">
                        <div className="questionA block text-sm font-light leading-6 text-dark">
                            <label htmlFor="answerA">Odpowiedź A: { <span className="error text-red-600 font-semibold">{errors.answerAError}</span> }</label>
                            <input 
                                id="answerA" 
                                type="text"
                                className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.answerAError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                name="answerA"
                                value={formData.answerA}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                name="correctAnswer"
                                value={0}
                                checked={formData.correctAnswer == 0}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="questionB block text-sm font-light leading-6 text-dark">
                            <label htmlFor="answerB">Odpowiedź B: { <span className="error text-red-600 font-semibold">{errors.answerBError}</span> }</label>
                            <input 
                                id="answerB" 
                                type="text"
                                className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.answerBError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                name="answerB"
                                value={formData.answerB}
                                onChange={handleChange}  
                            />
                            <input 
                                type="radio" 
                                name="correctAnswer"
                                value={1}
                                checked={formData.correctAnswer == 1}
                                onChange={handleChange} />
                        </div>
                        <div className="questionC block text-sm font-light leading-6 text-dark">
                            <label htmlFor="answerC">Odpowiedź C: { <span className="error text-red-600 font-semibold">{errors.answerCError}</span> }</label>
                            <input 
                                id="answerC" 
                                type="text"
                                className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.answerCError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                name="answerC"
                                value={formData.answerC}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                name="correctAnswer"
                                value={2}
                                checked={formData.correctAnswer == 2}
                                onChange={handleChange} />
                        </div>
                        <div className="questionD block text-sm font-light leading-6 text-dark">
                            <label htmlFor="answerD">Odpowiedź D: { <span className="error text-red-600 font-semibold">{errors.answerDError}</span> }</label>
                            <input 
                                id="answerD" 
                                type="text"
                                className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.answerDError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                name="answerD"
                                value={formData.answerD}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                name="correctAnswer"
                                value={3}
                                checked={formData.correctAnswer == 3}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="questionE block text-sm font-light leading-6 text-dark">
                            <label htmlFor="answerE">Odpowiedź E: { <span className="error text-red-600 font-semibold">{errors.answerEError}</span> }</label>
                            <input 
                                id="answerE" 
                                type="text"
                                className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 ${errors.answerEError ? "ring-red-500" : "ring-gray-300"} shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                name="answerE"
                                value={formData.answerE}
                                onChange={handleChange}
                            />
                            <input type="radio" 
                                name="correctAnswer"
                                value={4}
                                checked={formData.correctAnswer == 4}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button className="primary-button" onClick={handleSubmit}>Zapisz</button>
                        <Link to=".." relative="path" className="secondary-button">Anuluj</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}