import React, { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

export const Input = ({defaultVal, handleChange, maxLength, placeholder} : {defaultVal?: number, handleChange: any, maxLength?: number, placeholder: string}) => {
    return (
        <input defaultValue={defaultVal} onChange={(e) => handleChange(e)} maxLength={maxLength} className={styles.input} placeholder={placeholder}></input>
    )
}