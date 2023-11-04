import React, { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

export const Input = ({handleChange, maxLength, placeholder} : { handleChange: any, maxLength?: number, placeholder: string}) => {
    return (
        <input onChange={(e) => handleChange(e)} maxLength={maxLength} className={styles.input} placeholder={placeholder}></input>
    )
}