import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getCategoryQuestions } from "../../../services/api";
import Question from "../../../components/Question/Question";
import "./QuestionOverview.scss";
import Pagination from "../../../components/Pagination/Pagination";

let PageSize = 10;

export default function QuestionOverview()
{
    const params = useParams()
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const getQuestions = async () => {
            const questionArr = await getCategoryQuestions(params.name)
            console.log(questionArr)
            setQuestions(questionArr)
        }
        return () => getQuestions()
    }, [])

    const currentQuestions = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return questions.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, questions]);

    const questionsElements = currentQuestions.map((question, index) => {
        return (
            <div key={index}>
                <Question question={question} questionIndex={((currentPage-1)*PageSize)+(index+1)} type={"overview"} />
            </div>
        )
    })

    return (
        <div>
            <div className="category-title">
                <h1 className="text-center text-white font-semibold text-2xl md:text-5xl capitalize">
                    {params.name}
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