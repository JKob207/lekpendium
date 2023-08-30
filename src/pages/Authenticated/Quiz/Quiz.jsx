import React, { useEffect, useState, useMemo, useRef } from "react";
import "./Quiz.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLimitedAndRandomCategoryQuestion } from "../../../services/api";
import Pagination from "../../../components/Pagination/Pagination";
import Question from "../../../components/Question/Question";
import Popup from "../../../components/Popup/Popup";

export default function Quiz()
{
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [results, setResults] = useState({})
    const [togglePopup, setTogglePopup] = useState(false)
    const popupMessage = useRef({})
    const PageSize = 10

    useEffect(() => {
        const getQuestions = async () => {
            const questionArr = await getLimitedAndRandomCategoryQuestion(params.name, location.state.amount)
            //console.log(questionArr)
            setQuestions(questionArr)
        }

        return () => getQuestions()
    }, [])

    function setAnswers(index, result)
    {
        setResults(prev => {
            return ({...prev, [index]: result})
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => setTogglePopup(false), 6000);
        return () => clearTimeout(timer);
    }, [togglePopup])

    function endQuiz()
    {
        if(Object.keys(results).length < questions.length)
        {
            popupMessage.current = {header: "Zbyt mało odpowiedzi!", text: "Nie została udzielona odpowiedź na wszystkie pytania", style:"danger"}
            setTogglePopup(true)
            return
        }

        navigate("summary", { state: { results: results } })

    }

    const currentQuestions = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return questions.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, questions]);

    const questionsElements = currentQuestions.map((question, index) => {
        return (
            <div key={index}>
                <Question question={question} questionIndex={((currentPage-1)*PageSize)+(index+1)} type={"quiz"} setAnswers={setAnswers} answerResults={results}/>
            </div>
        )
    })

    return (
        <div>
            <h1>Quiz here!</h1>
            {questionsElements}
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={questions.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
            <div className="flex justify-center my-4">
                <button
                    className="primary-button"
                    onClick={endQuiz}
                >
                        Zakończ quiz
                </button>
            </div>
            {
                togglePopup && <Popup header={popupMessage.current.header} text={popupMessage.current.text} style={popupMessage.current.style} />
            }
        </div>
    )
}