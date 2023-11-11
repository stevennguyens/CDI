import React, { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

/*
    Input component
    @param {number} defaultVal? - optional default value in the input
    @param {any} handleChange - function when input is changed
    @param {number} maxLength? - optional max lenght of input
    @param {string} placeholder - optional placeholder of input
*/
export const Input = ({defaultVal, handleChange, maxLength, placeholder} : {defaultVal?: number, handleChange: any, maxLength?: number, placeholder: string}) => {
    return (
        <input defaultValue={defaultVal} onChange={(e) => handleChange(e)} maxLength={maxLength} className={styles.input} placeholder={placeholder}></input>
    )
}