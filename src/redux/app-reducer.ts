import { getAuthUserData } from "./auth-reducer";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
};

let initialState: InitialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state;
  }
}

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});

type ActionsType = initializedSuccessActionType;
type ThunkType = ThunkAction<Promise<void>,AppStateType, unknown, ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(()=> {
      dispatch(initializedSuccess());
  });
};

export default appReducer;