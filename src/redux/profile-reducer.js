import {
  profileAPI,
  usersAPI
} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
        ...state, posts: state.posts.filter(p => p.postId !== action.postId)
      };
      case SAVE_PHOTO_SUCCESS:
        return {
          ...state, profile: {...state.profile, photos: action.photos}
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

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;