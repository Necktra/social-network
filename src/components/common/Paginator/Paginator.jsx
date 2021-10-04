import styles from "./Paginator.module.css";
import React from "react";

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
            {pages.map(el => {
                return <span onClick={(e) => { onPageChanged(el) }} key={el.id} className={el === currentPage && styles.selectedPage}>{el}</span>
            })}
        </div>
}

export default Paginator;