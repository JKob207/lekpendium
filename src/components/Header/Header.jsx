import React, { useEffect, useState } from "react";
import './Header.scss';
import Dropdown from "../Dropdown/Dropdown";
import { getAvatar } from "../../services/api";
import { Link } from "react-router-dom";
import LEKpendium from "../../img/LEKpendium500x200.png";

export default function Header({user})
{
    const [toggleMenuState, setToggleMenuState] = useState(false)
    const [userAvatar, setUserAvatar] = useState("https://placehold.co/45")

    function toggleMenu()
    {
        console.log("Toggle menu!")
        setToggleMenuState(prev => !prev)
    }

    useEffect(() => {
        const getAvatarUrl = async () => {
            const avatar = await getAvatar(user.avatar)
            setUserAvatar(avatar)
        }

        return () => getAvatarUrl()
    }, [])

    return (
        <header className="header flex flex-row justify-between items-center w-full p-2">
            <Link to="/main">
                <img className="LEKpendium-logo" src={LEKpendium} alt="LEKpendium logo" />
            </Link>
            <div className="user-profile flex flex-row items-center justify-around w-48">
                <img className="rounded-full m-2 w-11" src={userAvatar} alt="User avatar"  />
                <div className="user-name">
                    <span className="font-semibold">{`${user.name} ${user.surname}`}</span>
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