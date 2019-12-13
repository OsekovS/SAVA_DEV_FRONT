import './LoginForm.scss'
import {logInThunk} from "../redux/auth-reducer";
import React from 'react'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
const objects_form = (props) => {
   
       return <div className="modal-form-keeper modal-form-keeper__small" >
            <header className="Common__header Common__header_red">Добавить объект</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="pass" placeholder={"Пароль"} type="password" component={"input"}/></label>        
                <div>
                    <button>Авторизоваться</button> 
                </div>
            </form>
        </div>
// onClick={props.callback.bind(this,'view')}
}

const ObjectsReduxForm =  reduxForm({form: 'Auth'})(objects_form)

class rawLoginForm extends React.Component {
    componentDidMount() {
        // this.props.getUsersThunk();
        // console.log('!')
    }

    OnLogIn = (formData) => {
        this.props.logInThunk(formData)
    }
    render() {
                if(this.props.auth.isAuth) {return <Redirect to = "/" />}
                return  <ObjectsReduxForm onSubmit={this.OnLogIn} />
             }

}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
let mapDispatchToProps ={
    logInThunk
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(rawLoginForm);

export default LoginForm;
