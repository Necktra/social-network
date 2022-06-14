
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  usersAPI
} from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType } from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: true })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: false })
      }
    case SET_USERS:
      return {
        ...state, users: [...action.users]
      }

    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.currentPage
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state, totalUsersCount: action.totalUsersCount
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state, followingInProgress: action.isFetching ?
          [...state.followingInProgress, action.userId] :
          state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType;

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userID: number
}

export const followSuccess = (userID: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userID
});

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userID: number
}

export const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userID
});

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>,AppStateType, unknown, ActionsType>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
  }
};

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: any, actionCreator: (userId:number) => UnfollowSuccessActionType | FollowSuccessActionType) => {
  dispatch(toggleFollowingProgress(true, userID));
  let data = await apiMethod(userID);
  if (data.resultCode === 0) { dispatch(actionCreator(userID)) }
  dispatch(toggleFollowingProgress(false, userID));
};

export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess);
  }
};

export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  }
};

export default usersReducer;