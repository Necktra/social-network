import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {

    let onSendMessageClick = () => {
        //props.dispatch(sendMessageCreator());
        props.sendMessage();
    };

    let onNewMessageTextChange = (e) => {
        let body = e.target.value;
        //props.updateNewMessageBody(body);
        props.updateNewMessageBody(body);
    };

    let messagesElements = props.messages.map(message => <Message message={message.message} />);
    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>

                {/* <div><textarea onChange={onNewMessageTextChange} value={props.state.newMessageText} ref={newMessageElement}></textarea></div> */}
                <div><textarea onChange={onNewMessageTextChange} value={props.newMessageText}></textarea></div>
                <div><button onClick={onSendMessageClick}>Отправить</button></div>
            </div>


        </div>
    )
}

export default Dialogs;