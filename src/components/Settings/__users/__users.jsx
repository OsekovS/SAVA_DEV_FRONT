import React from 'react';
import './__users.scss';
import ListElem from '../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from '../../utils/fieldValidators/fieldValidators'
import {Input} from '../../Common/Input/Input'
const length10 = maxLengthCreator(10)
const form = (props) => {
    if(props.mode==='addUser') {return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить камеру</header>
        <form  className="modal-form" onSubmit={props.handleSubmit}>
             <span className="settings_text">Добавить пользователя</span>	
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={Input} validate={[required, length10]}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>
            <p><label>Права администратора: <Field name="admin"  component={"input"} type="checkbox"/></label></p>
            <div>
                <button >Добавить</button> <button onClick={props.callback}>Отмена</button>
            </div>
        </form>
        </div>
    )}
    else return null
}

const AddForm =  reduxForm({form: 'addUser'})(form)

const form2 = (props) => {
    if(props.mode==='changPass') {return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить камеру</header>
        <form  className="modal-form" onSubmit={props.handleSubmit}>
             <span className="settings_text">Добавить пользователя</span>	
            <p><label>Старый пароль: <Field name="old_password" placeholder={"Старый пароль"} type="password" component={Input} validate={[required, length10]}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Новый пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Новый пароль повторно"} type="password" component={"input"}/></label></p>
            <div>
                <button >Добавить</button> <button onClick={props.callback}>Отмена</button>
            </div>
        </form>
        </div>
    )}
    else return null
}

const ChangeForm =  reduxForm({form: 'changPass'})(form2)

class __users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: '', edited: ''}
            // Эта привязка обязательна для работы `this` в колбэке. .bind(this,'addUser')
        //this.onChangeMode = this.onChangeMode.bind(this, 'addUser');
        // this.onLogOut = this.onLogOut.bind(this);
      }

    onDellUser = (id) => {
        this.props.delUserThunk(id)
    }
    onAddUser = (user) => {
        this.props.addUserThunk(user)
        this.setState(state => ({
            mode: 'view'
        }));
    }
    onChangePass = (formData) => {
        console.log(this)
        console.log(this.state.edited)
        console.log(formData)
        this.props.changePassThunk(formData,this.state.edited)
    }
    onChangeMode = (mode) =>{
        // console.log(this)
        // console.log(mode)
        this.setState(state => ({
            mode: mode
        }));
        // console.log(this)
    }
    onSetEditedPass = (arg) =>{
        // console.log(arg)
        // console.log(this)
        this.setState(state => ({
            edited: arg
        }));
        this.onChangeMode('changPass')
        // console.log(this)
    }

    render() {
        let usersElements = this.props.users.map((e,n) => {  

            return <ListElem name='list-elem' items={e} 
            key={e.id}
            elemChangeCallBack={this.onSetEditedPass} elemDellCallBack={this.onDellUser}/>
            })
        return  <div className="Settings__users">
                {/* <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/> */}
                    <table className="Modules_table Modules_table__cam-dev">
                            <tbody>
                                {usersElements}  
                            </tbody>
                        </table>
                        <button onClick={this.onChangeMode.bind(this, 'addUser')}>Добавить</button>
                    <AddForm mode={this.state.mode} onSubmit={this.onAddUser} callback={this.onChangeMode.bind(this, 'view')} />
                    <ChangeForm mode={this.state.mode} onSubmit={this.onChangePass} callback={this.onChangeMode.bind(this, 'view')} />
                </div>
             }

}

// const __users = (props) => {

//     const onDellUser = (id) => {
//         props.delUserThunk(id)
//     }
//     const onAddUser = (user) => {
//         props.addUserThunk(user)
//     }
//     const onChangeMode = (mode) =>{
//         props.changeMode(mode)
//     }
//     //console.log(props.users)
//     let usersElements = props.users.map((e,n) => {  

//     return <ListElem name='list-elem' items={e} 
//     key={e.id}
//     elemChangeCallBack={onDellUser} elemDellCallBack={onDellUser}/>
//     })

//     return <div className="Settings__users">
//         {/* <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/> */}
//             <table className="Modules_table Modules_table__cam-dev">
//                     <tbody>
//                         {usersElements}  
//                     </tbody>
//                 </table>
//                 <button onClick={onChangeMode.bind(this,'addUser')}>Добавить</button>
//             <ReduxForm  onSubmit={onAddUser} />
//         </div>
// }

export default __users;