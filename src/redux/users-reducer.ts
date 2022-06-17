
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  usersAPI
} from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType, InferActionsTypes } from "./redux-store";

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
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: true })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: false })
      }
    case 'SET_USERS':
      return {
        ...state, users: [...action.users]
      }

    case 'SET_CURRENT_PAGE':
      return {
        ...state, currentPage: action.currentPage
      }
    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state, totalUsersCount: action.totalUsersCount
      }
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state, isFetching: action.isFetching
      }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state, followingInProgress: action.isFetching ?
          [...state.followingInProgress, action.userId] :
          state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userID: number) => ({
    type: 'FOLLOW',
    userID
  } as const),

  unfollowSuccess: (userID: number) => ({
    type: 'UNFOLLOW',
    userID
  } as const),

  setUsers: (users: Array<UserType>) => ({
    type: 'SET_USERS',
    users
  } as const),

  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
  } as const),

  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount
  } as const),

  toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
  } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
  } as const),
}

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
};

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
  dispatch(actions.toggleFollowingProgress(true, userID));
  let data = await apiMethod(userID);
  if (data.resultCode === 0) { dispatch(actionCreator(userID)) }
  dispatch(actions.toggleFollowingProgress(false, userID));
};

export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), actions.followSuccess);
  }
};

export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
  }
};

export default usersReducer;