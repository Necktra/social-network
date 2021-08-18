const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

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
  ],
  newMessageText: '',
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
  ]
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state, newMessageText: action.newText
      };
    case SEND_MESSAGE:
      return {
        ...state, newMessageText: "", messages: [...state.messages, {
          id: 5,
          message: state.newMessageText
        }]
      };
    default:
      return state;

  }
};

export const updateNewMessageTextCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newText: text
});
export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
});

export default dialogsReducer;