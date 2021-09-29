import classes from './MyPosts.module.css';
import React from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

const AddNewPostForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div><Field component={"textArea"} name={"newPostText"} placeholder={"Enter your new post"} /></div>
        <div><button>Add post</button></div>
    </form>)
};

const AddPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm);

const MyPosts = (props) => {

    let onAddPost = (values) => {
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
}

export default MyPosts;