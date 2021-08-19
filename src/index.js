import './index.css';
import reportWebVitals from './reportWebVitals';
// import store from './redux/store';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import {addPost, sendMessage, updateNewMessageText, updateNewPostText} from './redux/state';
//  {/* <App state={state} dispatch={store.dispatch.bind(store)} sendMessage={store.sendMessage.bind(store)} updateNewMessageText={store.updateNewMessageText.bind(store)}/> */}
//let rerenderEntireTree = (state) => {
ReactDOM.render(

  <React.StrictMode>  
    {/* В 49 уроке из-за задвоения юзеров в комментах советуют убрать */}

    <Provider store = {store}>
      {/* <App state={state} dispatch={store.dispatch.bind(store)} store={store}/> */}
      <App/>
    </Provider>
    {/* , */}

  </React.StrictMode>,   
  // В 49 уроке из-за задвоения юзеров в комментах советуют убрать

document.getElementById('root')
);
 
// };
// rerenderEntireTree(store.getState());

// store.subscribe(()=>{rerenderEntireTree(store.getState())});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
