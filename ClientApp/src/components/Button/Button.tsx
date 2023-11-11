import React from "react";
import style from "./Button.module.scss";

/*
    Button component 
    @param {string} text - text inside button
    @param {(any) => any} handleClick? - optional function called when button is clicked
    @param {string} classBtn? - optional class name of button
*/
export const Button = ({text, handleClick, classBtn}: {text: string, handleClick?: (e: any) => any, classBtn?: string}) => {
    return (
        <button onClick={handleClick} className={`${style.btn} ${classBtn ? style[classBtn] : ""}`}>{text}</button>
    )
}