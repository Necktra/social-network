import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import { Redirect } from 'react-router';

const Dialogs = (props) => {

    let onSendMessageClick = () => {
        props.sendMessage();
    };

    let onNewMessageTextChange = (e) => {
        //let body = e.target.value;
       
        //props.updateNewMessageBody(body);
        props.updateNewMessageBody(e.target.value);
    };

    let messagesElements = props.messages.map(message => <Message message={message.message} key={message.id}/>);
    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);

    if (!props.isAuth) {
        return <Redirect to={"/login"} />
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>

                <div><textarea onChange={onNewMessageTextChange} value={props.newMessageText}></textarea></div>
                <div><button onClick={onSendMessageClick}>Отправить</button></div>
            </div>


        </div>
    )
}

export default Dialogs;