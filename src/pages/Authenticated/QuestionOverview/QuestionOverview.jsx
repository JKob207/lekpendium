import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryQuestions } from "../../../services/api";
import Question from "../../../components/Question/Question";

export default function QuestionOverview()
{
    const params = useParams()
    const [questions, setQuestions] = useState([])

    useEffect(() => {

        const getQuestions = async () => {
            const questionArr = await getCategoryQuestions(params.name)
            console.log(questionArr)
            setQuestions(questionArr)
        }

        return () => getQuestions()
    }, [])

    const questionsElements = questions.map((question, index) => {
        return (
            <div key={index}>
                <Question question={question} questionIndex={index+1} />
            </div>
        )
    })

    return (
        <div>
            <h1>Questions here!</h1>
            {questionsElements}
        </div>
    )
}