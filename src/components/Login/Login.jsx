import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router";
import style from '../../components/common/FormsControls/FormsControls.module.css';

const LoginForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div> <Field placeholder={"Email"} validate={[required]} name={"email"} component={Input} /> </div>
        <div> <Field placeholder={"Password"} type={"password"} validate={[required]} name={"password"} component={Input} /> </div>
        <div> <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me</div>
        {props.error && <div className={style.formSummaryError}>
            {props.error}
        </div>}
        <div><button>Login</button></div>
    </form>)
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        // debugger;
        props.login(formData.email, formData.password, formData.rememberMe);
        //console.log(formData);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (<div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>)
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);