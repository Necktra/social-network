import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

// const SET_AUTH_USERS_DATA = 'SET_USERS_DATA';
const SET_AUTH_USERS_DATA = 'samurai-network/auth/SET_AUTH_USERS_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_AUTH_USERS_DATA:
      return {
        ...state,
        ...action.payload,
        // isAuth: true,
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

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.me();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", {_error: message}));
    }

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