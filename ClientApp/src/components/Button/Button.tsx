import React from "react";
import style from "./Button.module.scss";

export const Button = ({text, handleClick, classBtn}: {text: string, handleClick?: (e: any) => any, classBtn?: string}) => {
    return (
        <button onClick={handleClick} className={`${style.btn} ${classBtn ? style[classBtn] : ""}`}>{text}</button>
    )
}