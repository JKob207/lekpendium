import React, { useContext } from "react";
import "./Layout.scss"
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { userContext } from "../AuthRequired/AuthRequired";

export default function Layout()
{
    const user = useContext(userContext);

    return (
        <div className="site-wrapper flex flex-col">
            <Header user={user} />
            <main className="main-container">
                <Outlet />
            </main>
        </div>
    )
}