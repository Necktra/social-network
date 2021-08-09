import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogItem = (props) => {
    return (<div className={classes.dialog + " " + classes.active}>
        <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>)
}

const Message = (props) => {
    return (<div className={classes.message}>{props.message}</div>)
}

const Dialogs = (props) => {

    let dialogsData = [
        { id: 1, name: "Dima" },
        { id: 2, name: "Dima2" },
        { id: 3, name: "Dima3" },
        { id: 4, name: "Dima4" },
        { id: 5, name: "Dima5" },
    ];

    let messagesData = [
        { id: 1, message: "Привет" },
        { id: 2, message: "Hi" },
        { id: 3, message: "How are you" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Lalka" },
    ];

    let messagesElements = messagesData.map(message => <Message message={message.message} />);
    let dialogsElements = dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);    

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>

            <div className={classes.messages}>
                { messagesElements }
            </div>
        </div>

    )
}

export default Dialogs;