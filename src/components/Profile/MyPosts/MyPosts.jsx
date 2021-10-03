import classes from './MyPosts.module.css';
import React, { Component, PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div><Field component={Textarea} validate={[required, maxLength10]} name={"newPostText"} placeholder={"Enter your new post"} /></div>
        <div><button>Add post</button></div>
    </form>)
};

const AddPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm);

// class MyPosts extends PureComponent{

//     // shouldComponentUpdate (nextProps, nextState) {
//     //     return nextProps != this.props || nextState != this.state;
//     // }

//     render() {
//     let onAddPost = (values) => {
//         this.props.addPost(values.newPostText);
//     };

//     return (<div className={classes.postsBlock}>My posts
//         <h3>New post</h3>
//         <div>
//             <AddPostFormRedux onSubmit={onAddPost} />
//         </div>
//         <div className={classes.posts}>
//             {this.props.postsElements}
//         </div>
//     </div>
//     )}
// }

const MyPosts = React.memo((props) => {

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
})

export default MyPosts;