import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.dialogsPage.newMessageText,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // updateNewMessageBody: (body) => {dispatch(updateNewMessageTextCreator(body))},
        sendMessage: (newMessageBody) => {dispatch(sendMessageCreator(newMessageBody))},
    }
};

// compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthRedirect
//     )(Dialogs);

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs);