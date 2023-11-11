import React from "react"
import styles from "./Modal.module.scss"
import { Button } from "../Button/Button"

/*
    Modal component pop-up
    @param {string} text - text displayed in modal
    @param {any} setModalValue - set state of modal value to determine if true or false
*/
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