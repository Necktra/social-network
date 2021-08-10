import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
  { id: 1, name: "Dima" },
  { id: 2, name: "Dima2" },
  { id: 3, name: "Dima3" },
  { id: 4, name: "Dima4" },
  { id: 5, name: "Dima5" },
];

let messages = [
  { id: 1, message: "Привет" },
  { id: 2, message: "Hi" },
  { id: 3, message: "How are you" },
  { id: 4, message: "Yo" },
  { id: 5, message: "Lalka" },
];

let posts = [
  { id: 1, message: "Hi, my 1 post", likesCount: "2" },
  { id: 2, message: "Lalka, my 1 post", likesCount: "4" },
];

ReactDOM.render(
  <React.StrictMode>
    <App messages={messages} dialogs={dialogs} posts={posts}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
