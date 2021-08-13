const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {
  _state: {
    profilePage: {
      posts: [{
          id: 1,
          message: "Hi, my 1 post",
          likesCount: "2"
        },
        {
          id: 2,
          message: "Lalka, my 1 post",
          likesCount: "4"
        },
      ],
      newPostText: '',
    },
    dialogsPage: {
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
    },
    sidebar: {}
  },
  _callSubscriber() {
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  // sendMessage() {
  //   let newMessage = {
  //     id: 5,
  //     message: this._state.dialogsPage.newMessageText,
  //   };
  //   this._state.dialogsPage.messages.push(newMessage);
  //   this._state.dialogsPage.newMessageText = "";
  //   this._callSubscriber(this._state);
  // },
  // updateNewMessageText(newText) {
  //   this._state.dialogsPage.newMessageText = newText;
  //   this._callSubscriber(this._state);
  // },
dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let newMessage = {
        id: 5,
        message: this._state.dialogsPage.newMessageText,
      };
      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = "";
      this._callSubscriber(this._state);
    } 


  }
};

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export const updateNewMessageTextCreator = (text) => ({type: UPDATE_NEW_MESSAGE_BODY, newText: text});

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export default store;
window.store = store;