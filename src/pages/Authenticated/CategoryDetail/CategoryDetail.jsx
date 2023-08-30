import React, { useState } from "react";
import "./CategoryDetail.scss";
import { Link, useParams } from "react-router-dom";
import QuestionsPopup from "../../../components/QuestionsPopup/QuestionsPopup";

export default function CategoryDetail()
{
    const params = useParams()
    const [togglePopupState, setTogglePopupState] = useState(false)

    function togglePopup()
    {
        console.log("PupUp toggle!")
        setTogglePopupState(prev => !prev)

    }

    return (
        <div className="category-detail-container">
            <div className="category-title my-8">
                <h1 className="text-center text-white font-semibold text-2xl md:text-5xl capitalize">
                    {params.name}
                </h1>
            </div>
            <div className="category-options">
                <Link
                    to={`/main/category/${params.name}/overview`}
                    className="browse-questions-btn category-item cursor-pointer">
                        <p className="text-4xl font-semibold text-white text-center">Przeglądaj pytania</p>
                </Link>
                <div className="draw-questions-btn category-item cursor-pointer" onClick={togglePopup}>
                    <p className="text-4xl font-semibold text-white text-center">Losuj pytania</p>
                </div>
                <Link 
                    to={`/main/category/${params.name}/add`}
                    className="add-questions-btn category-item cursor-pointer">
                        <p className="text-4xl font-semibold text-white text-center">Dodaj pytanie</p>
                </Link>
            </div>
            {
                togglePopupState ? <QuestionsPopup category={params.name} closePopup={togglePopup} /> : null
            }
        </div>
    )
}