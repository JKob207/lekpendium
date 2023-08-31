import { createContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { auth } from '../../services/firebase-config';
import { getUserById } from '../../services/api';

export const userContext = createContext(null);

export default function AuthRequired()
{
    const [action, setAction] = useState(null)

    useEffect(() => {
        const AuthObserver = async () => {
            try {
                const result = await auth.onAuthStateChanged(async (user) =>
                {
                    if(!user)
                    {
                        setAction(<Navigate to="/" />)
                    }else
                    {
                        const userData = await getUserById(user.uid)
                        console.log(userData)

                        setAction(
                        <userContext.Provider value={userData}>
                            <Outlet />
                        </userContext.Provider>
                        )
                    }
                })
            } catch (error) {
                console.log(error)   
            }
        }
        
        AuthObserver()
        //return () => AuthObserver()

    }, [])
    

    return (
        <div>
        {
            action === null ?
            <h1>Loading</h1> : action
        }
        </div>
    )

}