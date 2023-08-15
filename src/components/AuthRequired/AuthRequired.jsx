import { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { auth } from '../../services/firebase-config';

export default function AuthRequired()
{
    const [action, setAction] = useState(null)

    useEffect(() => {
        const AuthObserver = async () => {
            const unregisterAuthObserver = await auth.onAuthStateChanged(user =>
                {
                    console.log(user)
                    if(!user)
                    {
                        setAction(<Navigate to="/" />)
                    }else
                    {
                        setAction(<Outlet />)
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