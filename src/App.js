// import logo from './logo.svg';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import {BrowserRouter, Route} from "react-router-dom";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

function App(props) {
  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
     
        {/* <Route path="/dialogs" render={ () => <DialogsContainer store={props.store}/>} /> */}
        <Route path="/dialogs" render={ () => <DialogsContainer/>} />
        {/* <Route path="/profile" render={ () => <Profile store={props.store}/>} /> */}
        <Route path="/profile" render={ () => <ProfileContainer/>} />

        <Route path="/users" render={ () => <UsersContainer/>} />

        <Route path="/news" render={ () => <News />} />
        <Route path="/music" render={ () => <Music />} />
        <Route path="/settings" render={ () => <Settings />} />     
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
