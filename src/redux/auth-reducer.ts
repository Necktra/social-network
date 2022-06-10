import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

// const SET_AUTH_USERS_DATA = 'SET_USERS_DATA';
const SET_AUTH_USERS_DATA = 'samurai-network/auth/SET_AUTH_USERS_DATA';
const TOGGLE_IS_FETCHING = 'samurai-network/auth/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType2 = {
//   userId: number | null,
//   email: string | null,
//   login: string | null,
//   isFetching: boolean,
//   isAuth: boolean,
//   captchaUrl: string | null,
// };

let initialState = {
  userId: null as number | null,
  email: null as number | null,
  login: null as number | null,
  isFetching: false as boolean,
  isAuth: false as boolean,
  captchaUrl: null as string | null, //if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case SET_AUTH_USERS_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      }
    default:
      return state;
  }
}
type SetAuthUserDataActionPayloadType = {
  userId: number | null, 
  email: string | null, 
  login: string | null, 
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USERS_DATA,
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_AUTH_USERS_DATA,
  payload: { userId, email, login, isAuth }
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch: any) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
//export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));

};

export const logout = () => async (dispatch: any) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export default authReducer;