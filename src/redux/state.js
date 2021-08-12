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

  getState() {
    return this._state;
  },

  _callSubscriber() {
  },

  addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: 0
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
  },

  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },

  sendMessage() {
    let newMessage = {
      id: 5,
      message: this._state.dialogsPage.newMessageText,
    };
    this._state.dialogsPage.messages.push(newMessage);
    this._state.dialogsPage.newMessageText = "";
    this._callSubscriber(this._state);
  },

  updateNewMessageText(newText) {
    this._state.dialogsPage.newMessageText = newText;
    this._callSubscriber(this._state);
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  }

};

export default store;
window.store = store;