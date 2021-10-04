import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import { NavLink } from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
    // let u = user;
    // return <div key={u.id}>
    return <div>
                <span></span>
                <div><NavLink to={"/profile/" + user.id}><img src={(user.photos.small != null) ? user.photos.small : userPhoto} className={styles.userPhoto} /></NavLink></div>
                <div>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id);
                    }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}>Follow</button>}
                </div>
                <div>
                    <div>
                        <div>{user.name}</div><div>{user.status}</div>
                    </div>
                    <div>
                        <div>{"user.location.country"}</div><div>{"user.location.city"}</div>
                    </div>
                </div>
            </div>
}

export default User;