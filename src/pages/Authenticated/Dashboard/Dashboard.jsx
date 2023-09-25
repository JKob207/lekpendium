import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { getAllCategories } from "../../../services/api";
import { Link } from "react-router-dom";
import QuestionsPopup from "../../../components/QuestionsPopup/QuestionsPopup";

export default function Dashboard()
{
    const [categories, setCategories] = useState([])
    const [togglePopupState, setTogglePopupState] = useState(false)

    useEffect(() => {
        
        const getCategories = async () => {
            try {
                const categoriesData = await getAllCategories()
                setCategories(categoriesData)
            } catch (error) {
                console.log(error)
            }
        }

        getCategories()
    }, [])

    function togglePopup()
    {
        setTogglePopupState(prev => !prev)
    }

    const categoriesElements = categories.map(cat => {
        return (
            <Link to={`category/${cat.name}`} className="category" key={cat.id}>
                <img src={cat.image} alt="category img" />
                <p>{cat.name}</p>
            </Link>
        )
    })

    return (
        <div className="dashboard--container">
            <div className="all-questions--container">
                <div className="dashboard--title my-8">
                    <h2 className="text-center font-semibold text-2xl md:text-5xl">Wszystkie Pytania</h2>
                </div>
                <div className="all-container px-6">
                    <div
                        className="category all-questions cursor-pointer"
                        onClick={togglePopup}
                    >
                        <p>Rozpocznij quiz!</p>
                    </div>
                </div>
            </div>
            <div className="categories-questions--container">
                <div className="dashboard--title my-8">
                    <h2 className="text-center font-semibold text-2xl md:text-5xl">Kategorie Pytań</h2>
                </div>
                <div className="catgory-container px-6 pb-6">
                    {categoriesElements}
                </div>
            </div>
            {
                togglePopupState ? <QuestionsPopup category={"all"} closePopup={togglePopup} /> : null
            }
        </div>
    )
}