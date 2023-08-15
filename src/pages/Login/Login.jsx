import { useState } from "react";
import './Login.scss'
import { Link, useNavigate } from "react-router-dom";
import { login } from "./../../services/api"

export default function Login()
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    async function handleSubmit()
    {
        if(formData.email && formData.password)
        {
            try{
                const loginResult = await login(formData.email, formData.password)
                console.log(loginResult.user.uid)
                if(loginResult.user.uid)
                {
                    navigate("/main")
                }
                
            }catch(err)
            {
                console.log(err)
            }
        }
    }

    return (
        <div className="login--page">
            <div className="flex flex-col items-center background primary-col">
                <img className="my-8 rounded-full" src="https://placehold.co/150" alt="LEKpendium logo" />
                <div className="login--container bg-white h-full w-full px-8 pt-16 rounded-t-3xl">
                    <div className="login--form-container flex flex-col justify-center">
                        <form className="login--form">
                            <div className="form--email block text-sm font-light leading-6 text-dark">
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email" 
                                    type="email"
                                    name="email"
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    onChange={handleChange} 
                                    value={formData.email}
                                />
                            </div>
                            <div className="form--password block text-sm font-light leading-6 text-dark">        
                                <label htmlFor="password">Hasło</label>
                                <input 
                                    id="password" 
                                    type="password"
                                    name="password"
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    onChange={handleChange} 
                                    defaultValue={formData.password}     
                                />
                            </div>
                        </form>
                        <button
                            className="primary-button my-8"
                            onClick={handleSubmit}
                        >Zaloguj się</button>
                        <p className="text-center">Nie masz jeszcze konta? <Link to="register" className="font-bold text-primary">Zarejestruj się</Link></p>
                    </div>
                </div>
            </div>
            <div className="secondary-col"></div>
        </div>
    )
}