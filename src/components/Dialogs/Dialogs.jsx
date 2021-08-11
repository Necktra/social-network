import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';

const Dialogs = (props) => {

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        props.sendMessage();
        //newMessageElement.current.value = "";
    };

    let onNewMessageTextChange = () => {        
        props.updateNewMessageText(newMessageElement.current.value);
    };

    let messagesElements = props.state.messages.map(message => <Message message={message.message} />);
    let dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                {messagesElements}

                <textarea onChange={onNewMessageTextChange} value={props.state.newMessageText} ref={newMessageElement}></textarea>
                <button onClick={sendMessage}>Отправить</button>
            </div>


        </div>
    )
}

export default Dialogs;