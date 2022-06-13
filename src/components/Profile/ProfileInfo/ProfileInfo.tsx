import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png';
import { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    // saveProfile: (profile: ProfileType) => Promise<any>
    saveProfile: (profile: ProfileType) => any
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => { setEditMode(false) })
    };

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt="img" />
                {profile.aboutMe}</div>
            {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

{/* @ts-ignore */}
            {editMode ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> : <ProfileData goToEditMode={() => { setEditMode(true) }} isOwner={isOwner} profile={profile} />}


            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: React.MouseEventHandler<HTMLButtonElement>
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
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
            <b>Contscts:</b> {Object.keys(profile.contacts).map(key => { return <Contact contactTitle={key} key={key} contactValue={profile.contacts[key as keyof ContactsType]} /> })}
        </div>
    </div>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return (<div className={classes.contact}><b>{contactTitle} :</b>{contactValue}</div>)
}

export default ProfileInfo;