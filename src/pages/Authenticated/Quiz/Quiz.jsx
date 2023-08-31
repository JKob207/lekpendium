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
    const [timerTime, setTimerTime] = useState(0)
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

    useEffect(() => {
        const interval = location.state.timer ? setInterval(() => {
            setTimerTime((prev => prev + 1))
        }, 1000) : null
        return () => {if(interval) clearInterval(interval)};
      }, [])

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

    function pad(value) //formating timer time
    {
        let valString = value + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    return (
        <div>
            <div className="quiz-title-container">
                <h1 className="quiz-title">Kategoria: {params.name}</h1>
                <h2 className="timer">{location.state.timer && (pad(parseInt(timerTime / 60) + ":" + pad(timerTime % 60)))}</h2>
            </div>
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