import React from "react";
import "./UserQuestions.scss";
import { NavLink, Outlet } from "react-router-dom";

export default function UserQuestions()
{
    return (
        <div>
            <div className="filter-container">
                <div className="filter-grid">
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="interna">Interna</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="medycyna ratunkowa i intensywna terapia">Medycyna ratunkowa i intensywna terapia</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="medycyna rodzinna">Medycyna rodzinna</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="prawo medyczne">Prawo medyczne</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="chirurgia">Chirurgia</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="psychiatria">Psychiatria</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="pediatria">Pediatria</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active-filter" : "filter-item"} to="ginekologia">Ginekologia</NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}