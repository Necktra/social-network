import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

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

dispatch(action) {

  this._state.profilePage = profileReducer(this._state.profilePage, action);
  this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
  this._state.sidebar = sidebarReducer(this._state.sidebar, action);

  this._callSubscriber(this._state);

  }
};

export default store;
window.store = store;