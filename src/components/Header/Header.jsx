import React, { useState } from "react";
import './Header.scss'
import { logout } from "../../services/api";
import Dropdown from "../Dropdown/Dropdown";

export default function Header()
{
    const [toggleMenuState, setToggleMenuState] = useState(false)

    function toggleMenu()
    {
        console.log("Toggle menu!")
        setToggleMenuState(prev => !prev)
    }

    return (
        <header className="header flex flex-row justify-between items-center w-full p-2">
            <img className="rounded-full" src="https://placehold.co/60" alt="LEKpendium logo" />
            <div className="user-profile flex flex-row items-center justify-around	w-48">
                <img className="rounded-full m-2" src="https://placehold.co/45" alt="User avatar" />
                <div className="user-name">
                    <span className="font-semibold">Jan Nowak</span>
                </div>
                <div className="dropdown-menu-block">
                    <button className="toggleMenu" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <Dropdown toggleState={toggleMenuState}/>
                </div>
            </div>
        </header>
    )
}