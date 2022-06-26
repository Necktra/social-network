import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { Redirect } from 'react-router';
import { DialogType, MessageType } from '../../redux/dialogs-reducer';
import AddMessageForm from './AddMessageForm/AddMessageForm';

// type PropsType = {
//     dialogsPage: InitialStateType
//     sendMessage: (messageText: string) => void
// }

export type NewMessageFormValuesType = {
    newMessageBody: string
}

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    isAuth: boolean
    sendMessage: (newMessageBody: string) => void
}


const Dialogs: React.FC<PropsType> = (props) => {

    let messagesElements = props.messages.map(message => <Message message={message.message} key={message.id} />);
    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);

    // if (!props.isAuth) {
    //     return <Redirect to={"/login"} />
    // };

    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;