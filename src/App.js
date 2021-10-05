// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import React from 'react';
import { Suspense } from 'react';
import { withSuspence } from './hoc/withSuspence';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if(!this.props.initialized) { return <Preloader/>};

    return (
    // <BrowserRouter>
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path="/dialogs" render={withSuspence(DialogsContainer)} />
        <Route path="/profile/:userId?" render={withSuspence(ProfileContainer)} />
        <Route path="/users" render={ () => <UsersContainer/>} />
        <Route path="/login" render={ () => <LoginPage/>} />
        <Route path="/news" render={ () => <News />} />
        <Route path="/music" render={ () => <Music />} />
        <Route path="/settings" render={ () => <Settings />} />     
      </div>
    </div>
    // </BrowserRouter>
  );
}}

const mapStateToProps = (state) => ({initialized: state.app.initialized});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJsApp = (props) => {
  return <Provider store = {store}>
  <HashRouter basename={process.env.PUBLIC_URL}>
  {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
     <AppContainer/>
  {/* </BrowserRouter> */}
  </HashRouter>
</Provider>
};

export default SamuraiJsApp;
