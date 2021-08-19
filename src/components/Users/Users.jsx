import axios from "axios";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";

let Users = (props) => {

//     if (props.users.length === 0){

//         let getUsers = () => {axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
//         props.setUsers(response.data.items); 
//         });};

// // props.setUsers([{
// //     id: 1,
// //     photoUrl: "https://dn-meb.ru/wp-content/uploads/2018/06/User_Placeholder.png",
// //     followed: true,
// //     fullName: "Ira",
// //     status: "Hi",
// //     location: {city: "Moscow", country: "Russia"}
// //   },
// //   {
// //     id: 2,
// //     photoUrl: "https://dn-meb.ru/wp-content/uploads/2018/06/User_Placeholder.png",
// //     followed: true,
// //     fullName: "Ira2",
// //     status: "Hi2",
// //     location: {city: "Moscow2", country: "Russia2"}
// //   },
// //   {
// //     id: 3,
// //     photoUrl: "https://dn-meb.ru/wp-content/uploads/2018/06/User_Placeholder.png",
// //     followed: false,
// //     fullName: "Ira3",
// //     status: "Hi3",
// //     location: {city: "Moscow3", country: "Russia3"}
// //   },
// //   {
// //     id: 4,
// //     photoUrl: "https://dn-meb.ru/wp-content/uploads/2018/06/User_Placeholder.png",
// //     followed: true,
// //     fullName: "Ira4",
// //     status: "Hi4",
// //     location: {city: "Moscow4", country: "Russia4"}
// //   },
// // ]);
//     }
let getUsers = () => {
    if (props.users.length === 0){

        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
        props.setUsers(response.data.items); 
        })
   
    };}

    return <div>
        <button onClick={getUsers}>Get users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span></span>
                <div><img src={(u.photos.small != null) ? u.photos.small : userPhoto} className={styles.userPhoto} /></div>
                <div>
                    {u.followed ? <button onClick={()=>{props.unfollow(u.id)}}>Unfollow</button> : <button onClick={()=>{props.follow(u.id)}}>Follow</button>}
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
};

export default Users;