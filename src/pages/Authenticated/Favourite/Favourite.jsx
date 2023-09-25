import React, { useEffect, useMemo, useState } from "react";
import Question from "../../../components/Question/Question";
import { useContext } from "react";
import { userContext } from "../../../components/AuthRequired/AuthRequired";
import Pagination from "../../../components/Pagination/Pagination";

let PageSize = 10;

export default function Favourite()
{
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const user = useContext(userContext);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const questionArr = user.favourite
                setQuestions(questionArr)
            } catch (error) {
                console.log(error)
            }
        }
        getQuestions()
    }, [])

    const currentQuestions = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return questions.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, questions]);

    const questionsElements = currentQuestions.map((question, index) => {
        return (
            <div key={index}>
                <Question question={question} questionIndex={((currentPage-1)*PageSize)+(index+1)} type={"overview"} setAnswers={() => {}} answerResults={{}} />
            </div>
        )
    })

    return (
        <div>
            <div className="favourite-title my-4">
                <h1 className="text-center font-semibold text-2xl md:text-5xl capitalize">
                    Ulubione
                </h1>
            </div>

            {questionsElements}

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={questions.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}