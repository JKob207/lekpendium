import React from "react";
import "./Dropdown.scss"
import { logout } from "../../services/api";
import { Link } from "react-router-dom";

export default function Dropdown({ toggleState })
{
    return (
        <div className={`z-10 bg-white ${ toggleState ? "" : "hidden" } divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dropdown`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                    <Link to="profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profil</Link>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Statystyki</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ulubione</a>
                </li>
                <li>
                    <Link to="userQuestions/all" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Twoje pytania</Link>
                </li>
            </ul>
            <div className="py-2" onClick={logout}>
                <span className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wyloguj się</span>
            </div>
        </div>

        
    )
}