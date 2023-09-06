import React from "react";
import "./UserQuestions.scss";
import { Link, Outlet } from "react-router-dom";

export default function UserQuestions()
{
    return (
        <div>
            <div className="filter-container">
                <div className="filter-grid">
                    <Link className="filter-item" to="all">Wszystkie</Link>
                    <Link className="filter-item" to="interna">Interna</Link>
                    <Link className="filter-item" to="medycyna ratunkowa i intensywna terapia">Medycyna ratunkowa i intensywna terapia</Link>
                    <Link className="filter-item" to="medycyna rodzinna">Medycyna rodzinna</Link>
                    <Link className="filter-item" to="prawo medyczne">Prawo medyczne</Link>
                    <Link className="filter-item" to="chirurgia">Chirurgia</Link>
                    <Link className="filter-item" to="psychiatria">Psychiatria</Link>
                    <Link className="filter-item" to="pediatria">Pediatria</Link>
                    <Link className="filter-item" to="ginekologia">Ginekologia</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}