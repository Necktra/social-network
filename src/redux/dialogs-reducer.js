const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

const dialogsReducer = (state, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageText = action.newText;
            return state;
        case SEND_MESSAGE:
            let newMessage = {
                id: 5,
                message: state.newMessageText,
            };
            state.messages.push(newMessage);
            state.newMessageText = "";
            return state;
        default:
            return state;

    }
};

export const updateNewMessageTextCreator = (text) => ({type: UPDATE_NEW_MESSAGE_BODY, newText: text});
export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export default dialogsReducer;