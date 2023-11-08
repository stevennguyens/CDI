import React from "react";
import { Cdi } from "../../types/CdiType";
import styles from "./ListItem.module.scss";
import { Link } from "react-router-dom";

const ListItem = ({item, page} : {item: Cdi, page?: boolean}) => {
    return (
        <div className={page ? styles.page : styles.listItem}>
            <div className={styles.listItemHeader}>
                <h5 className={styles.topic}>{item.topic} ({item.locationabbr})</h5>
                <Link to={`/cdis/edit/${item.id}`}>
                    <span className={`material-symbols-outlined ${styles.editIcon}`}>
                        edit_square
                    </span>
                </Link>
            </div>
            
            <div className={styles.dataDiv}>
                <p><b>Id: </b>{item.id}</p>
                <p><b>Category: </b>{item.question}</p>
                <p><b>Data: </b> {item.datavalue ? item.datavalue : "No Data"}{item.datavalue && (item.datavalueunit !== 'Number') ? item.datavalueunit : ""}</p>
                {item.race && <p><b>Race/ethnicity: </b>{item.race}</p>}
                {item.gender && <p><b>Gender: </b>{item.gender}</p>}
                <p><b>Year: </b>{item.yearstart} - {item.yearend}</p>
            </div>
        </div>
    )
}

export default ListItem