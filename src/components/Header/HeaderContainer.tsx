import React from "react";
import Header from "./Header";
import { logout } from '../../redux/auth-reducer';
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnPropsType = {
    isAuth: boolean
    login: number
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({ isAuth: state.auth.isAuth, login: state.auth.login });

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { logout })(HeaderContainer);