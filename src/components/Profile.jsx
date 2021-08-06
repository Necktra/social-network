import classes from './Profile.module.css';

const Profile = () => {
    return (<div className={classes.content}>
        <img src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        <div>Ava + description</div>
        <div>My posts
            <div>New post</div>
            <div className={classes.posts}>
                <div className={classes.item}>Post 1</div>
                <div className={classes.item}>Post 2</div>
            </div>
        </div>
    </div>
    )
}

export default Profile;