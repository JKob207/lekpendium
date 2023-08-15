import { useState } from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { register } from "../../services/api";
import './Register.scss'

export default function Register()
{
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordCheck: "",
        avatar: ""
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
        if(formData.name && formData.surname && formData.email && formData.password && formData.passwordCheck && formData.avatar)
        {
            if(formData.password !== formData.passwordCheck)
            {
                console.log("Diffrent passwords")
                return
            }

            try
            {
                const registerResult = await register(formData.email, formData.password)
                console.log(registerResult)
            }catch(err)
            {
                console.log(err)
            }

        }else
        {
            console.log("Missing part!")
        }
    }

    return (
        <div className="register--page">
            <div className="flex flex-col items-center background primary-col">
                <img className="my-4 rounded-full" src="https://placehold.co/150" alt="LEKpendium logo" />
                <div className="register--container bg-white h-full w-full px-8 rounded-t-3xl">
                    <div className="register--form-container flex flex-col justify-center">
                        <form className="register--form">
                            <div className="form--name block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="name">Imię</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--surname block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="surname">Nazwisko</label>
                                <input 
                                    id="surname" 
                                    type="text" 
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" 
                                    name="surname"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--email block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="email">Email</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" 
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--password block">        
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="password">Hasło</label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" 
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--password-check block">        
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="password-check">Powtórz hasło</label>
                                <input 
                                    id="passwordCheck" 
                                    type="password" 
                                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    name="passwordCheck"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--avatar block">
                                <label className="block text-sm font-light leading-6 text-dark" htmlFor="avatar">Wgraj awatara</label>
                                <input 
                                    id="avatar"
                                    type="file"
                                    className="block w-full rounded-md border-0 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    name="avatar"
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                        <button className="primary-button my-8" onClick={handleSubmit}>Zarejestruj się</button>
                    </div>
                </div>
            </div>
            <div className="secondary-col"></div>
        </div>
    )
}