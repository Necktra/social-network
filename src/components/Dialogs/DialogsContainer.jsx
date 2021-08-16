import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    };

    let onNewMessageTextChange = (body) => {
        props.store.dispatch(updateNewMessageTextCreator(body));
    };

    let newMessageText = state.newMessageText;

    return (<Dialogs sendMessage={onSendMessageClick} messages={state.messages} updateNewMessageBody={onNewMessageTextChange} dialogs={state.dialogs} newMessageText={newMessageText} />)
}

export default DialogsContainer;