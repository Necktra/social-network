import classes from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (<div>
        <div>
            <img className={classes.imgWall} src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        </div>
        <div className={classes.descriptionBlock}>
            <img src={props.profile.photos.large} />
            {props.profile.aboutMe}</div>
        <div>
            FB: {props.profile.contacts.facebook}<br />
            VK: {props.profile.contacts.vk}<br />
            Instagram: {props.profile.contacts.instagram}<br />
        </div>
    </div>
    )
}

export default ProfileInfo;