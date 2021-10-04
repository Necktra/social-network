import classes from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (<div>
        <div>
            <img className={classes.imgWall} src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        </div>
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large} />
            {profile.aboutMe}</div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        <div>
            FB: {profile.contacts.facebook}<br />
            VK: {profile.contacts.vk}<br />
            Instagram: {profile.contacts.instagram}<br />
        </div>
    </div>
    )
}

export default ProfileInfo;