import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import classes from './ProfileInfo.module.css';
import style from './../../common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        {/* <div>
            <img className={classes.imgWall} src='https://i.pinimg.com/originals/de/30/de/de30dec00431f4b36c09cdd7dafd01e5.jpg'></img>
        </div> */}
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

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormReduxForm;