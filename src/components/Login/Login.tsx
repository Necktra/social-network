import { connect } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router";
import style from '../../components/common/FormsControls/FormsControls.module.css';
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>& LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (<form onSubmit={handleSubmit}>
        <>
        {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
        {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
        {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div><button>Login</button></div>
        </>
    </form>)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (captcha: string,
                password: string,
                rememberMe: boolean,
                email: string) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (<div>
        <h1>LOGIN</h1>
        
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>)
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);