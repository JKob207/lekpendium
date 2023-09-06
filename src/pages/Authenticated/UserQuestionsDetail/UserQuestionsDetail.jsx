import React, { useContext, useEffect, useMemo, useState } from "react";
import "./UserQuestionsDetail.scss";
import { useParams } from "react-router-dom";
import { getUserQuestions } from "../../../services/api";
import { userContext } from "../../../components/AuthRequired/AuthRequired";
import Question from "../../../components/Question/Question";
import Pagination from "../../../components/Pagination/Pagination";

const PageSize = 10;

export default function UserQuestionsDetail()
{
    const params = useParams()
    const user = useContext(userContext)
    const [questions, setQuestions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        const getQuestions = async () => {
            try {
                const result = await getUserQuestions(user.id, params.name)
                setQuestions(result)
            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()
    }, [params.name])

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
            {
                questions.length > 0 ? (
                <div>
                    {questionsElements}

                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={questions.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div> 
                ) : (
                <div>
                    <h1 className="text-xl text-center font-semibold">Brak dodanych pytań do tej kategorii</h1>
                </div>
            )}
        </div>
    )
}