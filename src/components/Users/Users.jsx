import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                unfollow={props.unfollow} follow={props.follow}
                key={u.id} />
            )
            }
        </div>
    </div>
}

export default Users;