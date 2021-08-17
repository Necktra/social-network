import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.newMessageText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {dispatch(updateNewMessageTextCreator(body))},
        sendMessage: () => {dispatch(sendMessageCreator())},
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;