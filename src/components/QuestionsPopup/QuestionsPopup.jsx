import React, { useState } from "react";
import "./QuestionsPopup.scss"
import { Link } from "react-router-dom";

export default function QuestionsPopup({category, closePopup})
{
    const [amount, setAmount] = useState(25)

    const changeAmount = event => {
        setAmount(event.target.value)
    }

    return (
        <div className="popup-background">
            <div className="popup-container">
                <span className="cursor-pointer" onClick={closePopup}>&#10005;</span>
                <h2 className="text-4xl	font-semibold text-center">Ustawienia Quizu</h2>
                <div className="popup-settings flex flex-col">
                    <div className="max-value-slider mt-7">
                        <div className="slider-input">
                            <label htmlFor="max-value" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Maksymalna Ilość Pytań</label>
                            <div className="slider-range-value">
                                <input 
                                    type="range"
                                    id="max-value"
                                    min={5}
                                    max={50}
                                    step={1}
                                    onChange={changeAmount}
                                    value={amount}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                                <span>{amount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="time-input mt-7">
                        <label htmlFor="time-counting" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white flex justify-between	items-center">
                        Licz czas?
                            <div className="relative">
                                <input id="time-counting" type="checkbox" className="sr-only" />
                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                            </div>
                        </label>
                    </div>
                    <button
                        className="primary-button my-7"
                    >Rozpoczynam</button>
                </div>
            </div>
        </div>
    )
}