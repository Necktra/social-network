import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';

const Profile = () => {
    return (<div>
        <img src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        <div>Ava + description</div>
        <MyPosts />
    </div>
    )
}

export default Profile;