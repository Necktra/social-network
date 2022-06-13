import classes from './MyPosts.module.css';
import React, { FormEvent, FormEventHandler } from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

type AddNewPostFormPropsType = {
    // handleSubmit: FormEvent<HTMLFormElement>
    handleSubmit: FormEventHandler<HTMLFormElement>
    // handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    // handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const AddNewPostForm: React.FC<AddNewPostFormPropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div><Field component={Textarea} validate={[required, maxLength10]} name={"newPostText"} placeholder={"Enter your new post"} /></div>
        <div><button>Add post</button></div>
    </form>)
};

//@ts-ignore
const AddPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm);

type MyPostsPropsType = {
    addPost: (newPostBody: string) => void
    postsElements: JSX.Element[]
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {
    let onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    };

    return (<div className={classes.postsBlock}>My posts
        <h3>New post</h3>
        <div>
            <AddPostFormRedux onSubmit={onAddPost} />
        </div>
        <div className={classes.posts}>
            {props.postsElements}
        </div>
    </div>
    )
})

export default MyPosts;