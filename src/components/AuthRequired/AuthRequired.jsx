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
            await auth.onAuthStateChanged(async (user) =>
                {
                    if(!user)
                    {
                        setAction(<Navigate to="/" />)
                    }else
                    {
                        const userData = await getUserById(user.uid)

                        setAction(
                        <userContext.Provider value={userData}>
                            <Outlet />
                        </userContext.Provider>
                        )
                    }
                }
              )
        }
        
        return () => AuthObserver()

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