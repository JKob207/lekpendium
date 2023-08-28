import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { getAllCategories } from "../../../services/api";
import { Link } from "react-router-dom";

export default function Dashboard()
{
    const [categories, setCategories] = useState([])

    useEffect(() => {
        
        const getCategories = async () => {
            const categoriesData = await getAllCategories()
            setCategories(categoriesData)
        }

        return () => getCategories()
    }, [])

    const categoriesElements = categories.map(cat => {
        return (
            <Link to={`category/${cat.name}`} className="category" key={cat.id}>
                <img src="https://placehold.co/50" alt="category img" />
                <p>{cat.name}</p>
            </Link>
        )
    })

    return (
        <div className="dashboard--container">
            <div className="dashboard--title my-8">
                <h1 className="text-center font-semibold text-2xl md:text-5xl">Wybierz Swoją Kategorię</h1>
            </div>
            <div className="catgory-container px-6">
                {categoriesElements}
            </div>
        </div>
    )
}