import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import React from 'react';
import Profile from './Profile';
import axios from 'axios';

class ProfileContainer extends React.Component{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            // this.props.setUserProfile(response.data);
          
        })
    }

    render() {return (<div>
        <Profile {...this.props}/>
    </div>
    )}
}

export default ProfileContainer;