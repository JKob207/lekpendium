import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../components/AuthRequired/AuthRequired";
import { deleteImage, getAvatar, updateUser, uploadImage } from "../../../services/api";

export default function Profile()
{
    const user = useContext(userContext)
    const [userAvatar, setUserAvatar] = useState("https://placehold.co/150")
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        avatar: ""
    })

    const [errors, setErrors] = useState({
        nameError: "",
        surnameError: "",
        emailError: "",
        avatarErrors: ""
    })

    useEffect(() => {
        formData.name = user.name
        formData.surname = user.surname
        formData.email = user.email
        formData.avatar = user.avatar

        const getAvatarUrl = async () => {
            try {
                const avatar = await getAvatar(user.avatar)
                setUserAvatar(avatar)
            } catch (error) {
                console.log(error)
            }
        }

        getAvatarUrl()

    }, [])

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
            avatarErrors: ""
        })
        
        if(formData.name && formData.surname && formData.email)
        {
            const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email);

            if(!isEmail)
            {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    emailError: "Błędny adres email!"
                }))
                return
            }

            let avatarRef = formData.avatar
            console.log(avatarRef)

            if(avatarRef)
            {
                try {
                        const deleteAvatar = await deleteImage(user.avatar)
                        avatarRef = await uploadImage(formData.avatar, user.id)
                        console.log("Avatar changed!")
                    } catch (error) {
                        console.log(error)
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            avatarErrors: "Błąd aktualizacji avataru!"
                        }))
                        return
                }
            }

            try {
                const updatedUser = {
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    avatar: avatarRef
                }
                console.log("User to update: ")
                console.log(updatedUser)
                console.log("ID: " + user.id)
                const newUpdateUser = await updateUser(user.id, updatedUser)
                console.log("User updated!")
                navigate(0)

            } catch (error) {
                console.log(error)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nameError: "Błąd aktualizacji danych!"
                }))
                return
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
                passwordError: "Brakujące pole!"
            }))
        }
    }

    return (
        <div className="profile--page">
            <div className="py-8 flex flex-col items-center background primary-col">
                <img className="rounded-full w-44" src={userAvatar} alt="LEKpendium logo" />
                <div className="profile--container bg-white h-full w-full px-8 rounded-t-3xl">
                    <div className="profile--form-container flex flex-col justify-center">
                        <form className="profile--form mt-4">
                            <div className="form--name block">
                                <label className="text-sm font-light leading-6 text-dark" htmlFor="name">Imię { <span className="error text-red-600 font-semibold">{errors.nameError}</span> }</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    className={`block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.nameError ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
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
                                    value={formData.surname}
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
                                    value={formData.email}
                                />
                            </div>
                            <div className="form--avatar block">
                                <label className="block text-sm font-light leading-6 text-dark" htmlFor="avatar">Zmień awatara (.png, .jpg, .jpeg) { <span className="error text-red-600 font-semibold">{errors.avatarErrors}</span> }</label>
                                <input 
                                    id="avatar"
                                    type="file"
                                    className="block w-full rounded-md border-0 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    name="avatar"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handleChangeFileUpload}
                                />
                            </div>
                        </form>
                        <div className="profile--buttons flex flex-col mt-4">
                            <button className="primary-button my-3" onClick={handleSubmit}>Zapisz zmiany</button>
                            <Link to="/main" className="secondary-button my-3">Powrót do strony głównej</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="secondary-col"></div>
        </div>
    )
}