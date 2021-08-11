import classes from './MyPosts.module.css';
import React from 'react';

const MyPosts = (props) => {

    let newPostElement = React.createRef();
    let addPost = () => { props.addPost(newPostElement.current.value)};

    return (<div className={classes.postsBlock}>My posts
        <h3>New post</h3>
        <div>
            <div>
                <textarea ref={newPostElement} name="" id="" cols="30" rows="5"></textarea>
            </div>
            <div>
                <button onClick={ addPost }>Add post</button>
            </div>
        </div>
        <div className={classes.posts}>
            { props.postsElements }
        </div>
    </div>
    )
}

export default MyPosts;