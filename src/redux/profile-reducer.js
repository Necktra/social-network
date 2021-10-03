import {
  profileAPI,
  usersAPI
} from "../api/api";

const ADD_POST = 'ADD_POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


let initialState = {
  posts: [{
      id: 1,
      message: "Hi, my 1 post",
      likesCount: "2"
    },
    {
      id: 2,
      message: "Lalka, my 1 post",
      likesCount: "4"
    },
  ],
  // newPostText: '',
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      return {
        ...state, posts: [...state.posts, {
          id: 5,
          message: action.newPostBody,
          likesCount: 0
        }]
      };
      // case UPDATE_NEW_POST_TEXT:
      //   return {
      //     ...state, newPostText: action.newText
      //   };
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile
      };
    case SET_STATUS:
      return {
        ...state, status: action.status
      };
      case DELETE_POST:
        return {
          ...state, posts: state.posts.filter(p => p.postId != action.postId)
        };
    default:
      return state;
  }
}

export const addPostActionCreator = (newPostBody) => ({
  type: ADD_POST,
  newPostBody
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
});
export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId)
    .then(response => {
      dispatch(setUserProfile(response.data));
    });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId)
    .then(response => {
      dispatch(setStatus(response.data));
    });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
};

// export const updateNewPostTextActionCreator = (text) => ({
//   type: UPDATE_NEW_POST_TEXT,
//   newText: text
// });

export default profileReducer;