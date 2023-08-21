import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { userContext } from "../AuthRequired/AuthRequired";

export default function Layout()
{
    const user = useContext(userContext);

    return (
        <div className="site-wrapper">
            <Header user={user} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}