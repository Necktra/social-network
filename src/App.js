// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import {BrowserRouter, Route} from "react-router-dom";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { Component } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';

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
        <Route path="/dialogs" render={ () => <DialogsContainer/>} />
        <Route path="/profile/:userId?" render={ () => <ProfileContainer/>} />
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

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
