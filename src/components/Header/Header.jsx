import React from "react";
import './Header.scss'
import { logout } from "../../services/api";

export default function Header()
{
    return (
        <div>Header here
            <button onClick={logout}>Logout</button>
        </div>
    )
}