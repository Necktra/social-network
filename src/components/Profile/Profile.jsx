import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    // let postsElements = props.state.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    return (<div>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        {/* <MyPostsContainer store={props.store}/> */}
        <MyPostsContainer/>
      
    </div>
    )
}

export default Profile;