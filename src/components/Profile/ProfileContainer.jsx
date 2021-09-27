import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Post from './MyPosts/Post/Post';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserProfile } from './../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { usersAPI } from './../../api/api';
import { Redirect } from 'react-router';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }

        this.props.getUserProfile(userId);

    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={"/login"} />
        };

        return (<div>
            <Profile {...this.props} profile={this.props.profile} />
        </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
};

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps,
    {
        getUserProfile,
    })(WithUrlDataContainerComponent);