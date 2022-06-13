import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import classes from './ProfileInfo.module.css';
import style from './../../common/FormsControls/FormsControls.module.css';
import { ProfileType } from "../../../types/types";
import { FormEventHandler } from "react";

type PropsType = {
    // handleSubmit: any
    handleSubmit: FormEventHandler<HTMLFormElement>
    // handleSubmit: FormEventHandler<HTMLFormElement>
    profile: ProfileType
    error: string
}

const ProfileDataForm: React.FC<PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <div>
                <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>

            <div>
                <b>My professional skills</b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>
                {createField("About me", "aboutMe", [], Textarea)}
            </div>
        </div>
        <div>
            <b>Contscts:</b> 
            {Object.keys(profile.contacts).map(key => { 
                return <div key={key} className={classes.contact}>
                    <b>{key} :</b> {createField(key, "contacts."+key, [], Input)}
                </div> })}
        </div>
    </form>
}

{/* @ts-ignore*/}
const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormReduxForm;