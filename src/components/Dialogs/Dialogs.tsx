import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { Redirect } from 'react-router';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { DialogType, MessageType } from '../../redux/dialogs-reducer';

type AddMessageFormPropsType = {
    handleSubmit: any
    // handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    // handleSubmit: React.FormEventHandler<HTMLFormElement>
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} validate={[required, maxLength50]} name={"newMessageBody"} placeholder={"Enter your message"} /></div>
            <div><button>Отправить</button></div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

type DialogsPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    isAuth: boolean
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let messagesElements = props.messages.map(message => <Message message={message.message} key={message.id} />);
    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);

    if (!props.isAuth) {
        return <Redirect to={"/login"} />
    };

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
                {/* @ts-ignore*/}
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;