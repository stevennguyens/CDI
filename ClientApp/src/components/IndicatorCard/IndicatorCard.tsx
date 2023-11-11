import React from "react";
import styles from "./IndicatorCard.module.scss";

/*
    Indicator Card component to display indicator
*/
export const IndicatorCard = ({text}:{text: string}) => {
    let arr = text.toLowerCase().replaceAll(",", "").split(" ");
    let link;
    if (arr.length > 1) {
        link = `${arr[0]}-${arr[1]}`;
    } else {
        link = arr[0]
    }
    return (
        <a target="_blank" href={`https://www.cdc.gov/cdi/definitions/${link}.html`} className={styles.indicator}>
            {text}
        </a>
    )
}