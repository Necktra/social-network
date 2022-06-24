import { InferActionsTypes } from "./redux-store";

export type DialogType = {
  id: number,
  name: string
}

export type MessageType = {
  id: number,
  message: string
}

let initialState = {
  messages: [{
    id: 1,
    message: "Привет"
  },
  {
    id: 2,
    message: "Hi"
  },
  {
    id: 3,
    message: "How are you"
  },
  {
    id: 4,
    message: "Yo"
  },
  {
    id: 5,
    message: "Lalka"
  },
  ] as Array<MessageType>,
  dialogs: [{
    id: 1,
    name: "Dima"
  },
  {
    id: 2,
    name: "Dima2"
  },
  {
    id: 3,
    name: "Dima3"
  },
  {
    id: 4,
    name: "Dima4"
  },
  {
    id: 5,
    name: "Dima5"
  },
  ] as Array<DialogType>
};

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/DIALOGS/SEND_MESSAGE':
      return {
        ...state, messages: [...state.messages, {
          id: 6,
          message: action.newMessageBody
        }]
      };
    default:
      return state;
  }
};

export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({
    type: 'SN/DIALOGS/SEND_MESSAGE',
    newMessageBody
  } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>