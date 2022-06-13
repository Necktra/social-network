import { sendMessageCreator, DialogType, MessageType } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}

type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        // newMessageText: state.dialogsPage.newMessageText,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMessageBody: string) => { dispatch(sendMessageCreator(newMessageBody)) },
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);