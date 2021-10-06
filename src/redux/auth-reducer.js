import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

// const SET_AUTH_USERS_DATA = 'SET_USERS_DATA';
const SET_AUTH_USERS_DATA = 'samurai-network/auth/SET_AUTH_USERS_DATA';
const TOGGLE_IS_FETCHING = 'samurai-network/auth/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null, //if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {

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

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USERS_DATA,
  payload: {userId, email, login, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.me();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    } 
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", {_error: message}));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

      dispatch(getCaptchaUrlSuccess(captchaUrl));
    
};

export const logout = () => async (dispatch) => {
  let data = await authAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
};

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export default authReducer;