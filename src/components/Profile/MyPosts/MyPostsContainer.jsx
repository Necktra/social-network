import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import Post from './Post/Post';

const MyPostsContainer = (props) => {
    let state = props.store.getState().profilePage;
    // debugger;
    //let postsElements = props.state.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
    let postsElements = state.posts.map(post => <Post message={post.message} likesCount={post.likesCount} />);

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };

    let onPostChange = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    };

    return (<MyPosts updateNewPostText={onPostChange} addPost={addPost} postsElements={postsElements} newPostText={state.newPostText} />)
}

export default MyPostsContainer;