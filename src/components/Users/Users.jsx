import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import { NavLink } from "react-router-dom";


let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }

    return <div>
        {/* <button onClick={getUsers}>Get users</button> */}
        <div>
            {pages.map(el => {
                return <span onClick={(e) => { props.onPageChanged(el) }} key={el.id} className={el === props.currentPage && styles.selectedPage}>{el}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span></span>
                <div><NavLink to={"/profile/" + u.id}><img src={(u.photos.small != null) ? u.photos.small : userPhoto} className={styles.userPhoto} /></NavLink></div>
                <div>
                    {u.followed ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                    {/* <button>Follow</button> */}
                </div>
                <div>
                    <div>
                        <div>{u.name}</div><div>{u.status}</div>
                    </div>
                    <div>
                        <div>{"u.location.country"}</div><div>{"u.location.city"}</div>
                    </div>
                    {/* <div></div> */}
                </div>
                {/* <div></div> */}
            </div>)
        }
    </div>
}


export default Users;