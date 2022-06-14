import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router";
import style from '../../components/common/FormsControls/FormsControls.module.css';
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnProps = {
    handleSubmit: any
    error: string
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (<form onSubmit={handleSubmit}>
        {createField("Email", "email", [required], Input)}
        {createField("Password", "password", [required], Input, { type: "password" })}
        {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div><button>Login</button></div>
    </form>)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type LoginPropsType = {
    isAuth: boolean
    captchaUrl: string | null
    login: (captcha: string,
        password: string,
        rememberMe: boolean,
        email: string) => void
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

const Login: React.FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (<div>
        <h1>LOGIN</h1>
        {/* @ts-ignore */}
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>)
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);