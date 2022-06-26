import { reduxForm } from 'redux-form';
import { required } from '../../../../utils/validators/validators';
import { Textarea, createField, GetStringKeys } from './../../../common/FormsControls/FormsControls';
import { InjectedFormProps } from 'redux-form';

type PropsType = {
}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
         { createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText', [required], Textarea) }
         {/* { createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText', [required], Input) } */}
        {/* <div><Field component={Textarea} validate={[required]} name={"newPostText"} placeholder={"Enter your new post"} /></div> */}
        <div><button>Add post</button></div>
    </form>)
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddNewPostForm' })(AddPostForm);
