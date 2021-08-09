import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (<div className={classes.postsBlock}>My posts
        <h3>New post</h3>
        <div>
            <div>
                <textarea name="" id="" cols="30" rows="5"></textarea>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </div>
        <div className={classes.posts}>
            <Post />
        </div>
    </div>
    )
}

export default MyPosts;