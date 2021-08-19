const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
  users: []
};

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW: 
      return {
        ...state, 
        users: state.users.map(el => {
          if (el.id === action.userID) {
            return {...el, followed: true}
          }
          return el
        }), 
      }
    case UNFOLLOW: 
    return {
      ...state, 
      users: state.users.map(el => {
        if (el.id === action.userID) {
          return {...el, followed: false}
        }
        return el
      }), 
    }
    case SET_USERS:
      //return {...state, users: [...state.users, ...action.users]}
      return {...state, users : [ ...action.users]}
    default:
      return state;
  }
}

export const followAC = (userID) => ({
  type: FOLLOW, userID
});
export const unfollowAC = (userID) => ({
  type: UNFOLLOW, userID
});
export const setUsersAC = (users) => ({
  type: SET_USERS, users
});

export default usersReducer;