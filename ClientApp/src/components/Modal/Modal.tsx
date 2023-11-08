import React from "react"
import styles from "./Modal.module.scss"
import { Button } from "../Button/Button"

export const Modal = ({text, setModalValue}: {text: string, setModalValue: any}) => {
    return(
        <div className={styles.modalPage}>
            <div className={styles.modalDiv}>
                {text}
                <div>
                    <Button handleClick={() => setModalValue(false)} text="Cancel" classBtn="blueBtn"/>
                    <Button handleClick={() => setModalValue(true)} text="Delete" classBtn="deleteBtn"/>
                </div>
            </div>
        </div>
    )
}