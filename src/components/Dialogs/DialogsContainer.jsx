import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {

    let state = props.store.getState();

    let sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    let onNewMessageTextChange = (e) => {
        let newMessageText = e.target.value;
        props.store.dispatch(updateNewMessageTextCreator(newMessageText));
    };

    let newMessageText = state.dialogsPage.newMessageText;

    //let messagesElements = props.state.messages.map(message => <Message message={message.message} />);
    //let dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    return ( <Dialogs sendMessage={sendMessage} messages={state.dialogsPage.messages} onNewMessageTextChange={onNewMessageTextChange} dialogs={state.dialogsPage.dialogs} newMessageText={newMessageText}/>)
}

export default DialogsContainer;