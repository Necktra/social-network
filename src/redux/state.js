//import { rerenderEntireTree } from "../render";
let rerenderEntireTree = () => {
};

let state = {
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
}

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export const sendMessage = () => {
  let newMessage = {
    id: 5,
    message: state.dialogsPage.newMessageText,
  };
  state.dialogsPage.messages.push(newMessage);
  state.dialogsPage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewMessageText = (newText) => {
  state.dialogsPage.newMessageText = newText;
  rerenderEntireTree(state);
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
}

export default state;