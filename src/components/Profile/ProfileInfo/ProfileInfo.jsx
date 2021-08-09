import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (<div>
        <div>
            <img src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        </div>
        <div className={classes.descriptionBlock}>Ava + description</div>
    </div>
    )
}

export default ProfileInfo;