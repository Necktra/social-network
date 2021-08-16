import classes from './MyPosts.module.css';
import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

const MyPosts = (props) => {

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = () => {        
        props.updateNewPostText(newPostElement.current.value);
    };

    return (<div className={classes.postsBlock}>My posts
        <h3>New post</h3>
        <div>
            <div>
                <textarea onChange={onPostChange} value={props.newPostText} ref={newPostElement} name="" id="" cols="30" rows="5" />
            </div>
            <div>
                <button onClick={ onAddPost }>Add post</button>
            </div>
        </div>
        <div className={classes.posts}>
            { props.postsElements }
        </div>
    </div>
    )
}

export default MyPosts;