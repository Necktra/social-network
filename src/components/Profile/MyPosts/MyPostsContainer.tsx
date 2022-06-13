import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';
import Post from './Post/Post';

type MapStatePropsType = {
    postsElements: JSX.Element[]
}

type MapDispatchPropsType = {
    addPost: (newPostBody: string) => void
}

type OwnPropsType = {
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        postsElements: state.profilePage.posts.map(post => <Post message={post.message} key={post.id} likesCount={post.likesCount} />),
    }
};

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addPost: (newPostBody) => { dispatch(addPostActionCreator(newPostBody)) },
    }
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;