import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';

const Profile = (props) => {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
    
    return (<div>
        <ProfileInfo />
        <MyPosts postsElements={postsElements}/>
    </div>
    )
}

export default Profile;