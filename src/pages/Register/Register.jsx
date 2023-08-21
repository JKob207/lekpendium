import { useState } from "react";
import { encode as base64_encode } from 'base-64';
import { register, addUser, uploadImage } from "../../services/api";
import { Link } from "react-router-dom";
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

    const [errors, setErrors] = useState({
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",
        passwordCheckError: ""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleChangeFileUpload(event)
    {
        formData.avatar = event.target.files[0];
    }

    async function handleSubmit()
    {
        setErrors({
            nameError: "",
            surnameError: "",
            emailError: "",
            passwordError: "",
            passwordCheckError: ""
        })

        if(formData.name && formData.surname && formData.email && formData.password && formData.passwordCheck)
        {
            const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
            if(!isEmail) 
            {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    emailError: "Błędny adres email!"
                }))
                return
            }

            if(formData.password.length > 1 && formData.password.length < 6)
            {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordError: "Zbyt krótkie hasło!"
                }))
                return
            }

            if(formData.password !== formData.passwordCheck)
            {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordError: "Hasła nie są takie same!"
                }))
                return
            }
            
            try
            {
                const registerResult = await register(formData.email, formData.password)
                console.log(registerResult)

                const uid = registerResult.user.uid

                const avatarRef =  await uploadImage(formData.avatar, uid)

                const newUser = {
                    id: uid,
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    avatar: avatarRef
                }
                console.log(newUser)
                await addUser(newUser)

            }catch(err)
            {
                console.log(err)
                if(err === "auth/email-already-in-use")
                {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        emailError: "Wybrany adres email jest już zajety!"
                    }))
                    return
                }else
                {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        nameError: "Błąd rejestracji użytkownika!"
                    }))
                }
            }
        }else
        {
            if(!formData.name) setErrors((prevErrors) => ({
                ...prevErrors,
                nameError: "Brakujące pole!"
            }))
            
            if(!formData.surname) setErrors((prevErrors) => ({
                ...prevErrors,
                surnameError: "Brakujące pole!"
            }))

            if(!formData.email) setErrors((prevErrors) => ({
                ...prevErrors,
                emailError: "Brakujące pole!"
            }))

            if(!formData.password) setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: "Brakujące pole!"
            }))

            if(!formData.passwordCheck) setErrors((prevErrors) => ({
                ...prevErrors,
                passwordCheckError: "Brakujące pole!"
            }))
        }
    }

    return (
        <div className="register--page">
            <div className="flex flex-col items-center background primary-col">
                <img className="my-4 rounded-full" src="https://placehold.co/150" alt="LEKpendium logo" />
                <div className="register--container bg-white h-full w-full px-8 rounded-t-3xl">
                    <div className="register--form-container flex flex-col justify-center">
                        <form className="register--form mt-4">
                            <div className="form--name block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="name">Imię { <span className="error text-red-600 font-semibold">{errors.nameError}</span> }</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.nameError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--surname block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="surname">Nazwisko { <span className="error text-red-600 font-semibold">{errors.surnameError}</span> }</label>
                                <input 
                                    id="surname" 
                                    type="text" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.surnameError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`} 
                                    name="surname"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--email block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="email">Email { <span className="error text-red-600 font-semibold">{errors.emailError}</span> }</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.emailError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`} 
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--password block">        
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="password">Hasło { <span className="error text-red-600 font-semibold">{errors.passwordError}</span> }</label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.passwordError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`} 
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form--password-check block">        
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="password-check">Powtórz hasło { <span className="error text-red-600 font-semibold">{errors.passwordCheckError}</span> }</label>
                                <input 
                                    id="passwordCheck" 
                                    type="password" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.passwordCheckError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
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
                                    onChange={handleChangeFileUpload}
                                />
                            </div>
                        </form>
                        <button className="primary-button my-3" onClick={handleSubmit}>Zarejestruj się</button>
                        <p className="text-center">Masz już konto? <Link to="/" className="font-bold text-primary">Zaloguj się</Link></p>
                    </div>
                </div>
            </div>
            <div className="secondary-col"></div>
        </div>
    )
}