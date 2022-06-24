import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import {
  ResultCodesEnum,
} from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType } from "./redux-store";
import { ThunkAction } from 'redux-thunk';
import { profileAPI } from './../api/profile-api';

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
  let data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === ResultCodesEnum.Success) {
    if (typeof userId === 'number') {
      dispatch(getUserProfile(userId));
    }
  } else {
    //@ts-ignore
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages ? data.messages[0] : "Edit profile error");
  }
};

export default profileReducer;