import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {

    // let postsElements = props.state.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
    
    return (<div>
        <ProfileInfo />
        {/* <MyPostsContainer store={props.store} postsElements={postsElements}/> */}
        <MyPostsContainer store={props.store}/>
        {/* <MyPosts postsElements={postsElements} dispatch={props.dispatch} newPostText={props.state.newPostText}/> */}
        {/* <MyPosts stateTest={props.stateTest} postsElements={postsElements} addPost={props.addPost} updateNewPostText={props.updateNewPostText} newPostText={props.state.newPostText}/> */}
    </div>
    )
}

export default Profile;