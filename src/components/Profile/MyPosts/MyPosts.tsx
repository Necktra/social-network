import classes from './MyPosts.module.css';
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm';
import React from 'react';
import Post from './Post/Post';
import { PostType } from '../../../types/types';


export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (<div className={classes.postsBlock}>My posts
        <h3>New post</h3>
        <div>
            <AddPostForm onSubmit={onAddPost} />
        </div>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;