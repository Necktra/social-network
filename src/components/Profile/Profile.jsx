import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';

const Profile = () => {

    let posts = [
        { id: 1, message: "Hi, my 1 post", likesCount: "2" },
        { id: 2, message: "Lalka, my 1 post", likesCount: "4" },
    ];

    let postsElements = posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);
    

    return (<div>
        <ProfileInfo />
        <MyPosts postsElements={postsElements}/>
    </div>
    )
}

export default Profile;