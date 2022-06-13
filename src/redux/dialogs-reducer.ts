// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

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

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state, newMessageText: action.newText
    //   };
    case SEND_MESSAGE:
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

// export const updateNewMessageTextCreator = (text) => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   newText: text
// });
type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody
});

export default dialogsReducer;