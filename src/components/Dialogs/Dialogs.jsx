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
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                <DialogItem name="Dima" id="1" />
                <DialogItem name="Dima2" id="2" />
                <DialogItem name="Dima3" id="3" />
                <DialogItem name="Dima4" id="4" />
            </div>

            <div className={classes.messages}>
                <Message message="Привет"/>
                <Message message="Hi"/>
                <Message message="How are you"/>
                <Message message="Yo"/>
            </div>
        </div>

    )
}

export default Dialogs;