import classes from './MyPosts.module.css';
// import Post from './Post/Post';

const MyPosts = (props) => {

    // let posts = [
    //     { id: 1, message: "Hi, my 1 post", likesCount: "2" },
    //     { id: 2, message: "Lalka, my 1 post", likesCount: "4" },
    // ];

    // let postsElements = posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

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
            { props.postsElements }
        </div>
    </div>
    )
}

export default MyPosts;