import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { HashRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
// import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import React from 'react';
import { withSuspence } from './hoc/withSuspence';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
};

const SuspendedDialogs = withSuspence(DialogsContainer);
const SuspendedProfile = withSuspence(ProfileContainer);

class App extends Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    // alert("Some error occured");
    //диспатч санки с ошибкой в апп редюсер  
    // console.error(promiseRejectionEvent);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) { return <Preloader /> };

    return (
      // <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/dialogs" render={withSuspence(() => <SuspendedDialogs />)} />
            <Route path="/profile/:userId?" render={withSuspence(() => <SuspendedProfile />)} />
            <Route path="/users" render={() => <UsersContainer pageTitle="Samurai" />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
      // </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized });

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJsApp: React.FC = () => {
  return (

    <HashRouter basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>

  )
};

export default SamuraiJsApp;
