import React from "react";
import './Header.scss'
import { logout } from "../../services/api";

export default function Header()
{
    function toggleMenu()
    {
        console.log("Toggle menu!")
    }

    return (
        <header className="header flex flex-row justify-between items-center w-full p-2">
            <img className="rounded-full" src="https://placehold.co/60" alt="LEKpendium logo" />
            <div className="user-profile flex flex-row items-center">
                <img className="rounded-full m-2" src="https://placehold.co/45" alt="User avatar" />
                <div className="user-name">
                    <span className="font-semibold">Jan Nowak</span>
                </div>
                <button className="toggleMenu" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                <button onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
        </header>
    )
}