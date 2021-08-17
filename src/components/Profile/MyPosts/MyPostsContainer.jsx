import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import Post from './Post/Post';

const mapStateToProps = (state) => {
    return {
        postsElements: state.profilePage.posts.map(post => <Post message={post.message} likesCount={post.likesCount} />),
        newPostText: state.profilePage.newPostText,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {dispatch(updateNewPostTextActionCreator(text))}, 
        addPost: () => {dispatch(addPostActionCreator())},
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;