import classes from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    // const onSubmit = async (formData) => {
    //     await saveProfile(formData);
    //     setEditMode(false)
    // };
    const onSubmit = (formData) => {
        saveProfile(formData).then(()=>{setEditMode(false)})
    };


    // const deactivateEditMode = () => {
    //     setEditMode(false);
    //     // props.updateStatus(status);
    // }


    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} />
                {profile.aboutMe}</div>
            {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

            {editMode ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> : <ProfileData goToEditMode={() => { setEditMode(true) }} isOwner={isOwner} profile={profile} />}


            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        {/* <div>
            <img className={classes.imgWall} src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        </div> */}
        <div>
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b> {profile.lookingForAJobDescription}
                </div>}
            <div>
                <b>About me</b> {profile.aboutMe}
            </div>
        </div>
        <div>
            <b>Contscts:</b> {Object.keys(profile.contacts).map(key => { return <Contact contactTitle={key} key={key} contactValue={profile.contacts[key]} /> })}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return (<div className={classes.contact}><b>{contactTitle} :</b>{contactValue}</div>)
}

export default ProfileInfo;