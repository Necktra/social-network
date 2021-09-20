import { authAPI } from "../api/api";

const SET_AUTH_USERS_DATA = 'SET_USERS_DATA';
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
        ...action.data,
        isAuth: true,
      }
      
    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      }
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login) => ({
  type: SET_AUTH_USERS_DATA,
  data: {userId, email, login}
});

export const getAuthUserData = () => (dispatch) => {
  authAPI.me().then(data => {
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login));
    }
  });
  
};

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export default authReducer;