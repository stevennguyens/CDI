import React from "react";
import { Cdi } from "../../data/cdi";
import styles from "./ListItem.module.scss";

const ListItem = ({item} : {item: Cdi}) => {
    return (
        <div className={styles.listItem}>
            <h5 className={styles.topic}>{item.topic} ({item.locationabbr})</h5>
            <div className={styles.dataDiv}>
                <p><b>Id: </b>{item.id}</p>
                <p><b>Indicator: </b>{item.question}</p>
                <p><b>Data: </b> {item.datavalue ? item.datavalue : "No Data"}{item.datavalue && (item.datavalueunit !== 'Number') ? item.datavalueunit : ""}</p>
                <p><b>{item.stratcategoryone}: </b>{item.stratone}</p>
                <p><b>Year: </b>{item.yearstart} - {item.yearend}</p>
            </div>
        </div>
    )
}

export default ListItem