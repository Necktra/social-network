import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
    // let newMessageElement = React.createRef();

    let sendMessage = () => {
        props.dispatch(sendMessageCreator());
    };

    let onNewMessageTextChange = (e) => {
        let newMessageText = e.target.value;
        // props.dispatch(updateNewMessageTextCreator(newMessageElement.current.value));
        props.dispatch(updateNewMessageTextCreator(newMessageText));
    };

    let messagesElements = props.state.messages.map(message => <Message message={message.message} />);
    let dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>

                {/* <div><textarea onChange={onNewMessageTextChange} value={props.state.newMessageText} ref={newMessageElement}></textarea></div> */}
                <div><textarea onChange={onNewMessageTextChange} value={props.state.newMessageText}></textarea></div>
                <div><button onClick={sendMessage}>Отправить</button></div>
            </div>


        </div>
    )
}

export default Dialogs;