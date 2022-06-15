import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import {
  profileAPI,
  usersAPI
} from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType } from "./redux-store";
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [{
    id: 1,
    message: "Hi, my 1 post",
    likesCount: 2
  },
  {
    id: 2,
    message: "Lalka, my 1 post",
    likesCount: 4
  },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
        ...state, posts: state.posts.filter(p => p.id !== action.postId)
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    default:
      return state;
  }
}

type ActionsType = addPostActionCreatorActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;

type addPostActionCreatorActionType = {
  type: typeof ADD_POST
  newPostBody: string
}

export const addPostActionCreator = (newPostBody: string): addPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostBody
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile
});

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status
});

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    if (typeof userId === 'number'){
    dispatch(getUserProfile(userId));
}
  } else {
    //@ts-ignore
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;