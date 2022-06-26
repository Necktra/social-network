import { reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField } from './../../common/FormsControls/FormsControls';
import { InjectedFormProps } from 'redux-form';
import { NewMessageFormValuesType } from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
};

export default reduxForm<NewMessageFormValuesType>({ form: 'dialogAddMessageForm' })(AddMessageForm);