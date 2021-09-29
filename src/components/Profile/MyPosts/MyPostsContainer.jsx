import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import Post from './Post/Post';

const mapStateToProps = (state) => {
    return {
        postsElements: state.profilePage.posts.map(post => <Post message={post.message} key={post.id} likesCount={post.likesCount} />),
        // newPostText: state.profilePage.newPostText,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // updateNewPostText: (text) => {dispatch(updateNewPostTextActionCreator(text))}, 
        addPost: (newPostBody) => {dispatch(addPostActionCreator(newPostBody))},
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;